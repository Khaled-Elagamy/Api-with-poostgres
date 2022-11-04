# Storefront Backend Project

## Table of Contents

This project is a back end for a storefront with the databses, connection and the most of error handling

## How it was made

This project is made by setting up databases for
users [to have the information of users (id,Email,Username,FirstName,LastName,HashedPassword)],
products[To have the products (Name,Product_Descrip,Price)],
orders[To have the orders (id,status,Userid)],
Order products[To have the products of orders (id,Quantity,OrderId)],

By using different HTTP Request Method you can add and edit in every database defined at -[Endpoints](#Endpoints-to-be-accessed)

## Tests made

The server got logger middleware to give the ip,api visited,status,and the time taken in ms.

# It test during runtime

    if the {user,product,order] found in the databse before editing its info.
    if the order is found before adding products to it .

## How to use

# Ports

Database port:5432
Port to access the backend: 3000
localhost:3000

# Setup:

`config.ts` contain all the configration for environmental variables.
You have to create `.env` file with all the required enironment variables:

```bash
# .env
PORT=3000
NODE_ENV=dev
# Database connection information
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=
POSTGRES_DB_TEST=
POSTGRES_USER=
POSTGRES_PASSWORD=
#User password
BCRYPT_PASSWORD=
SALT_ROUNDS=
TOKEN_SECRET=
```

### Creating the database

```sql
#Connect to the defaullt postgres database as the root user
  `psql -U postgres`
  - In psql create a user
  `CREATE USER store_admin WITH PASSWORD '123456';`
  - In psql create dev and test databses
  `CREATE DATABASE store_dev;`
  `CREATE DATABASE store_test;`
##Connect to the databses and grant all privileges
  - Grant for dev database
  `\c store_dev`
  `GRANT ALL PRIVILEGES ON DATABASE store_dev TO store_admin;`
  - Grant for test database
  `\c store_test`
  `GRANT ALL PRIVILEGES ON DATABASE store_test TO store_admin;`
###Run the migration command in terminal
  - npm run migration:run
####Start the server
-npm run start
-go to localhost:3000

```

# scripts:

```
npm run build:To build the project
npm run start:To start the server on localhost.
npm run dev: To devleop and run server.js .
npm run fulltest: To do all the migrations required and test the endpoint and fuctions using jasmine in one code.
npm run pretest: To reset the database and run all up migrations,and make the files ready to test.
npm run test: To run the endpoint and fuctions tests using jasmine.
npm run posttest: To reset the database after finish testing.

npm run prettier:To use prettier with the files.
npm run prettier:check  :To chcek that all files using the prettier format.
npm run lint :To use eslint to check coding error.
~
               ([Note]:after building the project for the first time or after deleting the build folder the eslint code will give some formatting error so run lint:fix code to fix them).
npm run lint:fix   :To fix any formatting errors.
npm run migration:run   :To run all the migrations adn create the tables in the database


## Endpoints to be accessed

localhost:3000  The basic server page.
```

### User

```sql
~
  [Get]/api/users            Create new user in the databse
                            [Require]:
                            email:
                            user_name:
                            first_name:
                            last_name:
                            password:
~
  [Get]/api/users            Get all the users in the database  [TOKEN]
  [Get]/api/users/id     -->[UserId]  Get data of certain user in the database [TOKEN]
  [Patch]/api/users/id   -->[UserId]  Update user data  [TOKEN]
                            [Require]:
                            The data want to updated.
~
  [Delete]/api/users/id  -->[UserId]  Delete the required user from the database [TOKEN]
~
### Products
~
  [Get]/api/products            Create new product in the databse [TOKEN]
                            [Require]:
                            product_name:
                            product_descrip:
                            price:
~
  [Get]/api/products            Get all the products in the database
  [Get]/api/products/id     -->[ProductID]  Get data of certain product in the database
  [Patch]/api/products/id   -->[ProductID]  Update product data  [TOKEN]
                            [Require]:
                            The data want to updated.
~
  [Delete]/api/products/id  -->[ProductID]  Delete the required product from the database [TOKEN]
~
### Orders
~
  [Get]/api/orders            Create new order in the databse [TOKEN]
                              Order status is set automatically to 'Active' when created
                            [Require]:
                            user_id:

~
  [Get]/api/orders            Get all the orders in the database  [TOKEN]
  [Get]/api/orders/id     -->[UserID]  Get data of certain order in the database [TOKEN]
  [Patch]/api/orders/id   -->[OrderID]  Update order data  [TOKEN]
                            [Require]:
                            The data want to updated.
~
  [Delete]/api/orders/id  -->[OrderID]  Delete the required order from the database [TOKEN]
~
### Order-Products
~
  [Get]/api/orders/id/products  -->[OrderID]
                  Create new order-product(Add the product to the order) in the databse [TOKEN]
                              [Require]:
                              quantity:
                              order_id:
                              product_id:
~
  [Get]/api/orders/id/products  -->[OrderID]
                  Get all the products associated with that order in the database  [TOKEN]
~
  [Delete]/api/orders/id/products  -->[Order-ProductID]
                  Delete the required order-product from the database [TOKEN]
~





```
