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

### Device Compatibility

This application is optimized for **desktop devices** only. It may not function as expected on mobile or tablet devices due to layout and interaction requirements tailored to desktop resolutions.

### Features

- As a user, I want to be able to see highlights in a dashboard view.

- As a user, I want to be able to view the list of reservations made.
- As a user, I want to be able to make a new reservation for a customer. 

- As a user, I want to be able to view all rooms available.
- As a user, I want to be able to view all guests.
- As a user, I want to be able to add new guest.

### Mockups

#### Reservations List
![mockup of reservations table, listing all the reservation details](/documentation/reserv.jpg)

#### Add new reservation
![mockup of adding new reservation through a form of inputs](/documentation/add-new-reserv.jpg)

#### Guests
![mockup showing a list of all the guests](/documentation/guests.jpg)

#### Guests
![mockup of adding new guests](/documentation/add-new-guests.jpg)

#### Rooms
![mockup showing a list of all the rooms available](/documentation/rooms.jpg)

#### Dashboard
![mockup of dashboard containing consolidated information about bookings and revenue generated](/documentation/dashboard.jpg)



### Endpoints

**GET /reservations**

Get a list of reservations made

Response:
```
[
    {
        "id": 1,
        "guest_id": 1,
        "room_id": 1,
        "room_type": "Family Room",
        "room_number": 202,
        "guest_name": "Eva Thomas",
        "no_of_guests": 4,
        "check_in": "2024-10-23T19:00:00.000Z",
        "check_out": "2024-10-28T15:00:00.000Z",
    },
    ...
]
```

**GET /reservations/:id**

Get reservation by ID

Response:
```
    {
       "id": 1,
        "guest_id": 1,
        "room_id": 1,
        "room_type": "Family Room",
        "room_number": 202,
        "guest_name": "Eva Thomas",
        "no_of_guests": 4,
        "check_in": "2024-10-23T19:00:00.000Z",
        "check_out": "2024-10-28T15:00:00.000Z",
        "created_at": "2024-10-25T16:19:54.000Z",
        "updated_at": "2024-10-25T16:19:54.000Z"
    }
```

**POST /reservation**

Add new reservation details to the list of reservations

Request:
```
    {
        "check_in":"2024-10-31 15:00:00",
        "check_out":"2024-11-01 11:00:00",
        "guest_id": 1,
        "guest_name": "Eva Thomas",
        "no_of_guests": "3",
        "room_id": 7,
        "room_number": "103",
        "room_type" : "Deluxe Room"
    }
```
Response:
```
    {
        "id": 1,
        "check_in":"2024-10-31 15:00:00",
        "check_out":"2024-11-01 11:00:00",
        "guest_id": 1,
        "guest_name": "Eva Thomas",
        "no_of_guests": "3",
        "room_id": 7,
        "room_number": "103",
        "room_type" : "Deluxe Room"
    }
```

**GET /rooms**

Get the list of rooms available

Response:
```
[
    {
        "id": 1,
        "room_number": 101,
        "room_type": "Deluxe Room",
        "capacity": 2,
        "status": "Occupied",
        "created_at": "2024-10-25T16:14:49.000Z",
        "updated_at": "2024-10-25T16:14:49.000Z"
    },
    ...
]
```

**GET /guests**

Get the list of guests

Response:
```
[
    {
        "id": 2,
        "guest_name": "Sofia Jane",
        "contact_number": "+1(647)-845-8531",
        "contact_email": "sofia@yahoo.com",
        "address": "4, Dufferin Ave",
        "city": "Toronto",
        "country": "Canada",
        "created_at": "2024-10-25T16:19:36.000Z",
        "updated_at": "2024-10-25T16:19:36.000Z" 
    },
    ...
]
```

**POST /guest**

Add new guest details to the list of guests

Request:
```
    {
        "guest_name":"eva",
        "contact_number":"6456783567",
        "contact_email":"vu@gmail.com",
        "address":"23, eve",
        "city":"Toronto",
        "country":"canada"
    }
```
Response:
```
    {
        "id": 1,
        "guest_name":"eva",
        "contact_number":"6456783567",
        "contact_email":"vu@gmail.com",
        "address":"23, eve",
        "city":"Toronto",
        "country":"canada" 
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
- Dashboard:
    - View gist of number of reservations, guests, rooms and occupancy rate
    - View room occupancy state in a chart 
- Reservations:
    - Read - display list of reservations
    - Create - add new reservation via add form
- Rooms:
    - Read - display available rooms
- Guests:
    - Read - display all guest who signed up
    - Create - add new guests via add form

## Nice-to-haves

- view/edit reservations, guests
- cancel reservation, remove guest
- Dates implementation calendar
- Filter, Search & Sorting 
- SignIn/SignUp
- ID proof validation
- add more rooms to one reservation
- track payments

## Database Setup

To set up the database correctly, migrations and seeds must be run in the following sequence. 

### Migrations

-  npx knex migrate:up 20241016212741_create_guests_table.js
-  npx knex migrate:up 20241016212756_create_rooms_table.js
-  npx knex migrate:up 20241016212536_create_reservations_table.js

### Seeds

-  npx knex seed:run --specific=01_guests.js
-  npx knex seed:run --specific=02_rooms.js
-  npx knex seed:run --specific=03_reservations.js