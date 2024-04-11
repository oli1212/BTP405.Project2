from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import mysql.connector

db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="password",
    port="3306",
    database="Restaurant"
)
cursor = db.cursor()


def getAllCustomers():# get all customers query
    cursor.execute("SELECT * FROM customer")
    return cursor.fetchall()

def getCustomerByID(params):# get customer by id
    cursor.execute("SELECT * FROM customer WHERE CustomerId = %s", params)
    return cursor.fetchone()

def getCustomerByEmail(params): # get customer by email
    cursor.execute("SELECT * FROM customer WHERE Email = %s", params)
    return cursor.fetchone()

def getCustomerIdByEmail(params): # get customer by email
    cursor.execute("SELECT CustomerId FROM customer WHERE Email = %s", params)
    return cursor.fetchone()

def getCustomersCreds():# get all customers query
    cursor.execute("SELECT * FROM customerLogin")
    return cursor.fetchall()

def getAllReservations():# get all reservations query
    cursor.execute("SELECT * FROM reservations")
    return cursor.fetchall()

def getReservationByID(params):# get reservation for a specific customer
    cursor.execute("SELECT * FROM reservations WHERE idReservation = %s", params)
    return cursor.fetchall()

def getAllTables():# get all tables query
    cursor.execute("SELECT * FROM tableList")
    return cursor.fetchall()

def insertInfo(table, params): # functions for inserting data into tables in the database
    if table == 'customer':# insert into table customer
        cursor.execute("INSERT INTO customer (Birthday, FirstName, Surname, Email) VALUES (%s, %s, %s, %s)", params)
        db.commit()
    elif table == 'customerLogin': # insert into table customerLogin
        cursor.execute("INSERT INTO customerLogin (CustomerId, Email, customerPassword) VALUES (%s, %s, %s)", params)
        db.commit()
    elif table == 'reservations': # insert into table reservations
        cursor.execute("INSERT INTO reservations (CustomerId, TableId, ReservationDate, ReservationStatus) VALUES (%s, %s, %s, %s)", params)
        db.commit()

def updateInfo(table, params): # functions for inserting data into tables in the database
    if table == 'customer':# update data in table customer
        cursor.execute("UPDATE customer SET Birthday = %s, FirstName = %s, Surname = %s, Email = %s WHERE CustomerId = %s", params)
        db.commit()
    elif table == 'customerLogin': # update data in table customerLogin
        cursor.execute("UPDATE customerLogin SET Email = %s, customerPassword = %s WHERE CustomerId = %s", params)
        db.commit()
    elif table == 'reservations': # update data in table reservations
        cursor.execute("UPDATE reservations SET TableId = %s,ReservationDate = %s, ReservationStatus = %s WHERE CustomerId = %s", params)
        db.commit()

def deleteInfo(table, params): # functions for deleting data into tables in the database
    if table == 'customer': # delete from table customer
        cursor.execute("DELETE FROM customer WHERE CustomerId = %s", params)
        db.commit()
    elif table == 'customerLogin': # delete from table customerLogin
        cursor.execute("DELETE FROM customerLogin WHERE CustomerId = %s" , params)
        db.commit()
    elif table == 'reservations': # delete from table reservations
        cursor.execute("DELETE FROM reservations WHERE CustomerId = %s", params)
        db.commit()


class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')  # Allow POST requests
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # Allow Content-Type header
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)
    
    def do_GET(self): # Implement GET method to view all/one customer(s) 
        if self.path == "/customers":#  get all customers
            all_customers = getAllCustomers()
            self._set_headers()
            self.wfile.write(json.dumps(all_customers).encode())

        elif self.path == "/customerCreds": # get all email and password
            customerCreds = getCustomersCreds()
            self._set_headers()
            self.wfile.write(json.dumps(customerCreds).encode())

        elif self.path == "/reservations":# get all reservations
            reservations = getAllReservations()
            self._set_headers()
            self.wfile.write(json.dumps(reservations).encode())

        elif self.path == "/tables": # get all tables
            tables = getAllTables()
            self._set_headers()
            self.wfile.write(json.dumps(tables).encode())

        elif self.path == "/customer": #  get one customer by id
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                record = getCustomerByID((customer['CustomerId'],))

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(response_data).encode())

            self._set_headers()
            self.wfile.write(json.dumps(record).encode())

        elif self.path == "/reservation": #  get data for a specifc reservation by id
            get_content_length = int(self.headers['Content-Length'])
            reservation = json.loads(self.rfile.read(get_content_length))

            try:
                record = getReservationByID((reservation['idReservation'],))

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(response_data).encode())

            self._set_headers()
            self.wfile.write(json.dumps(record).encode())

        else:
            self._set_headers(404)
  
    def do_POST(self): # Implement POST method to add new customers
        
        if self.path == "/registration":# insert a new customer into the system from registration form
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                rowExist = getCustomerByEmail((customer['Email'],))
                if rowExist:
                    response_data = {'success': False, 'message': 'Email is already used'}
                else:
                    insertInfo('customer', (customer['Birthday'], customer['FirstName'], customer['Surname'], customer['Email'],))
                    customerID = getCustomerIdByEmail((customer['Email'],))
                    insertInfo('customerLogin', (customerID[0], customer['Email'], customer['customerPassword']))
                    response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/customer": # insert a customer info for specific customer
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                insertInfo('customer', (customer['Birthday'], customer['FirstName'], customer['Surname'], customer['Email']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/reservation": # create a new reservation for specific customer
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                insertInfo('reservations', (customer['CustomerId'], customer['TableId'], customer['ReservationDate'], customer['ReservationStatus']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
        
        else:
            self._set_headers(404)

    def do_PUT(self):# Implement PUT method to update a customers
        if self.path == "/customer":
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                updateInfo('customer', (customer['Birthday'], customer['FirstName'], customer['Surname'], customer['Email'], customer['CustomerId']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/customerCreds":
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                updateInfo('customerLogin', (customer['CustomerId'], str(customer['Email']), str(customer['customerPassword'])))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/reservation":
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                updateInfo('reservations', (customer['CustomerId'], customer['TableId'], customer['ReservationDate'], customer['ReservationStatus']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
            
        else:
            self._set_headers(404)

    def do_DELETE(self): # Implement DELETE method to delete a patients

        if self.path == "/customer": # delete a patient from database, deleting the patient from the table will remove all records of patient
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                deleteInfo('customer', (customer['CustomerId'],))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/customerCreds": # delete a record for patient
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                deleteInfo('customerLogin', (customer['CustomerId']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/reservation": # delete a allergy for patient
            get_content_length = int(self.headers['Content-Length'])
            customer = json.loads(self.rfile.read(get_content_length))

            try:
                deleteInfo('reservations', (customer['CustomerId']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self._set_headers(404)

def run(serverClass=HTTPServer, handlerClass=RequestHandler, port=8080):
    serverAddress = ('', port)
    httpd = serverClass(serverAddress, handlerClass)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()