## Introduction

This is an online e-commerce API that is built on Express and MongoDB. And I have used TypeScript.

> Base_URL:

## Customer Features

- Customers can add products to their cards and create orders.

- Customers can confirm orders and delete orders if they haven't confirmed them.

- Customers can create, edit, and delete their addresses.

## Admin Features

- Admins can create, update, and delete all products and orders.

- Admins can watch all the customers and their addresses.

### API End Points and Methods

- **_Endpoints that can be accessed by customers are as follows:_**

|            | url                               | methods                  |
| ---------- | --------------------------------- | ------------------------ |
| _Base_URl_ | /products <br> /products/id       | GET                      |
| _Base_URl_ | /cart                             | GET                      |
| _Base_URl_ | /orders <br> /orders/id           | POST, GET, PATCH, DELETE |
| _Base_URl_ | /address <br> /address/id <space> | POST, GET, PATCH, DELETE |

- **_Endpoints that can be accessed by admins are as follows:_**

|            | url                               | methods                  |
| ---------- | --------------------------------- | ------------------------ |
| _Base_URl_ | /customers <br> /customers/id     | POST, GET, UPDATE, PATCH |
| _Base_URl_ | /products <br> /products/id       | POST, GET, PATCH, DELETE |
| _Base_URl_ | /orders <br> /orders/id           | POST, GET, PATCH, DELETE |
| _Base_URl_ | /address <br> /address/id <space> | POST, GET, UPDATE, PATCH |

Quick notes and assignment testing:
For sign up:
use http://localhost:5000/api/v1/auth/signup
e.g fields
{
"user_name": "yourUserName",
"email": "yourEmail",
"password": "yourPassword"

}

For sign in:
http://localhost:5000/api/v1/auth/signin
e.g fields:
{
"email": "yourEmail",
"password": "yourPassword"
}

Note: Please there is not a enough time to make it more better because I still have many features in mind but major assessement's requirements have been met

To start the server, clone and RUN "npm install" to install all the dependencies
