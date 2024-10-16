# Project Title
Staytion Hub

## Overview

Staytion Hub is an administration portal to manage bookings for Staytion Hotel. 

### Background

Staytion is a newly established hotel which provides world class experience for staying. To improve their online presence and business scalability, they are in need of two applications. The customer facing website that allows guests to explore the facilities and make reservations, and an administration portal for hotel managers and admins. Assuming that the customer facing application is functional, this project focuses on managing booking reservations and guests details.

### Problem Statement

 Currently Staytion does not have a robust way to manage things to run the hotel bookings. It also has future plans to expand it's business in multiple locations, therefore it needs a strongly built software application to work efficiently. An application that can handle booking details for customers and organize hotel management details, so that it is easy to analyze and manipulate data by hotel owners/managers.  


### User Profile

- Hotel Owner
- Admins/manager

### Features

- As a user, I want to be able to view the list of reservations made.
- As a user, I want to be able to view individual reservation details. 
- As a user, I want to be able to make a new reservation for a customer. 
- As a user, I want to be able to edit reservation details.
- As a user, I want to be able to cancel a reservation.

- As a user, I want to be able to view all rooms available.
- As a user, I want to be able to view all guests.
- As a user, I want to be able to view the reservation details made by a particular guest.

### Mockups

#### Reservations List
![mockup of reservations table, listing all the reservation details](/documentation/reservations.png)

#### Add new reservation
![mockup of adding new reservation through a form of inputs](/documentation/add-new-reservation.png)

#### View reservation
![mockup of viewing a selected reservation details ](/documentation/view-reservation.png)

#### Guests
![mockup showing a list of all the guests](/documentation/guests.png)

#### Rooms
![mockup showing a list of all the rooms available](/documentation/rooms.png)

#### Dashboard
![mockup of dashboard containing consolidated information about bookings and revenue generated](dashboard.png)


### Endpoints

**GET /reservations**

- get a list of reservations made

Response:
```
[
    {
        "id": 1,
        "guest_name": "Sam Anderson",
        "room_type": "Deluxe",
        "no_of_guests": 4,
        "check_in": date of check in,
        "check_out": date of check out,
        "status": "booked",
        "proof_document": "driver's_licence.png",
    },
    ...
]
```

**GET /reservations/:id**

- get reservation by ID

Response:
```
    {
        "id": 1,
        "guest_name": "Sam Anderson",
        "room_type": "Deluxe",
        "no_of_guests": 4,
        "check_in": date of check in,
        "check_out": date of check out,
        "status": "booked",
        "proof_document": "driver's_licence.png",
    }
```

**POST /reservation**

- add new reservation details to the list of reservations

Request:
```
    {
        "guest_name": "Sam Anderson",
        "room_type": "Deluxe",
        "no_of_guests": 4,
        "check_in": date of check in,
        "check_out": date of check out,
        "status": "booked",
        "proof_document": "driver's_licence.png",
    }
```
Response:
```
    {
        "id": 1,
        "guest_name": "Sam Anderson",
        "room_type": "Deluxe",
        "no_of_guests": 4,
        "check_in": date of check in,
        "check_out": date of check out,
        "status": "booked",
        "proof_document": "driver's_licence.png",
    }
```

**GET /rooms**

- get the list of rooms available

Response:
```
[
    {
        "id": 1,
        "room_number": 302,
        "room_type": "Deluxe",
        "capacity": 2,
        "status": "occupied",
        "housekeeping_status" : "clean", 
    },
    ...
]
```

**GET /guests**

- get the list of guests

Response:
```
[
    {
        "id": 1,
        "name": 302,
        "contact_number": "+1 647-872-9023",
        "contact_email": "sam@gmail.com",
        "address": "34, Erskine Street",
        "city":"Toronto"
        "proof_document" : "driver's_licence.png", 
    },
    ...
]
```

**POST /guest**

- add new guest details to the list of guests

Request:
```
    {
        "name": Sam Anderson,
        "contact_number": "+1 647-872-9023",
        "contact_email": "sam@gmail.com",
        "address": "34, Erskine Street",
        "city":"Toronto"
        "proof_document" : "driver's_licence.png", 
    }
```
Response:
```
    {
        "id": 1,
        "name": "Sam Anderson",
        "contact_number": "+1 647-872-9023",
        "contact_email": "sam@gmail.com",
        "address": "34, Erskine Street",
        "city":"Toronto"
        "proof_document" : "driver's_licence.png", 
    }
```

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing and controllers

- Database setup
    - design database and create tables and relations

- Create migrations and seeds

- Deploy client and server to GitHub and make an initial commit

- Features

- Reservations:
    - Read - display list of reservations
    - Read - display individual reservation details based on reservation ID
    - Create - add new reservation via form
    - Update - edit reservations details and update display list
    - Delete - cancel reservation

- Rooms:
    - Read - display available rooms
- Guests:
    - Read - display all guest who signed up
    - Read - view contact & booking details based on Guest ID


## Nice-to-haves

- Filter, Search & Sorting 
- Dates implementation calendar
- Dashboard
- SignIn/SignUp
- Customer website
