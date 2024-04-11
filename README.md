# **Project 2** #

This Restaurant System uses Python backend with Restful APIs, React JS for frontend, and MySQL for the database. GET, POST, PUT and DELETE requests have been implemented to retrieve, add, update, and delete customer information and customer reservations.

To try this system:
1. First you have to clone my repository in VS code.
2. With docker installed in your computer, you run the command in the root directroy
    "docker-compose up"
3. Now to run the server using python
    i. run **cd python** to change directories
    ii. run **py server.py** to run the server
   
* To try GET: **curl http://localhost:8080/customers**

* To try POST:**curl -X POST -H "Content-Type: application/json" -d '{"CustomerId": "1", "TableId": "5", "ReservationDate": "9999-12-31 23:59:59", "ReservationStatus": "Booked"}' http://localhost:8080/reservation**

* To try PUT:**curl -X PUT -H "Content-Type: application/json" -d '{"CustomerId": "1", "TableId": "5", "ReservationDate": "9999-12-31 23:59:59", "ReservationStatus": "Completed"}' http://localhost:8080/reservation**

* To try DELETE:**curl -X DELETE -H "Content-Type: application/json" -d '{"idReservation": "1"}' http://localhost:8080/reservation**

Another way of testing the System is by using an extension in VSCodes "Thunder Client".
You can easily choose either GET, POST, PUT and DELETE options.
The fetch URL will be the same ** http://localhost:8080/customers**, this request will get all customer registered with some information
If you want to try other requests, simply change the endpoint to the request you wish to test.

I used Jira, for my scrum, sprints, used case, and acceptance criteria:
https://akeshavarzi.atlassian.net/jira/core/projects/CBRRS/board

4. If you would like to try the front-end using react next.js first change the directory to my-app with 
while in the root directory **cd my-app**
then run **npm run dev**
the frontend has a simple home page, login form, registration form, and dashboard
    
