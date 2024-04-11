use Restaurant;

-- Creating table to hold customer basic information
CREATE TABLE customer(
  CustomerId int not null AUTO_INCREMENT,
  Birthday varchar(100) DEFAULT NULL,
  FirstName varchar(100) DEFAULT NULL,
  Surname varchar(100) DEFAULT NULL,
  Email varchar(100) DEFAULT NULL,
  PRIMARY KEY (CustomerID),
  UNIQUE KEY CustomerID_UNIQUE (CustomerID)
);

-- Creating table to hold customer login credentials (creds will be from registration form)
CREATE TABLE customerLogin (
  CustomerId int NOT NULL,
  Email varchar(100) DEFAULT NULL,
  customerPassword varchar(100) NOT NULL,
  UNIQUE KEY Email_UNIQUE (Email),
  UNIQUE KEY CustomerId_UNIQUE (CustomerId),
  CONSTRAINT CustomerId FOREIGN KEY (CustomerId) REFERENCES customer (CustomerId) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Creating table for customer reservations
CREATE TABLE reservations (
  idReservation int NOT NULL AUTO_INCREMENT,
  CustomerId int NOT NULL,
  TableId int NOT NULL,
  ReservationDate varchar(45) NOT NULL,
  ReservationStatus varchar(45) NOT NULL,
  PRIMARY KEY (idReservation),
  UNIQUE KEY idReservation_UNIQUE (idReservation),
  UNIQUE KEY CustomerID_UNIQUE (CustomerID),
  KEY CustomerId_idx (CustomerId),
  CONSTRAINT CustomerId1 FOREIGN KEY (CustomerId) REFERENCES customer (CustomerId) ON DELETE CASCADE ON UPDATE CASCADE
  CONSTRAINT TableId FOREIGN KEY (TableId) REFERENCES tableList (TableId) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Creating table for list of tables
CREATE TABLE tableList (
  TableID int NOT NULL AUTO_INCREMENT,
  Capacity int NOT NULL,
  TableStatus varchar(45) NOT NULL,
  PRIMARY KEY (TableID),
  UNIQUE KEY TableID_UNIQUE (TableID)
);

-- Insert sample data into tableList table
INSERT INTO tableList
(Capacity, TableStatus)
VALUES
(2, 'Occupied'),
(2, 'Free'),
(2, 'Free'),
(2, 'Occupied'),
(4, 'Occupied'),
(4, 'Free'),
(4, 'Free'),
(4, 'Occupied'),
(4, 'Free'),
(4, 'Occupied'),
(6, 'Free'),
(6, 'Occupied'),
(6, 'Free'),
(6, 'Free'),
(6, 'Occupied'),
(8, 'Free'),
(8, 'Occupied'),
(10, 'Free'),
(12, 'Free');