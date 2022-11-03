
# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

**TABLE OF CONTENTS**

-[API and Database Requirements](#api-and-databse-requirements)
 -[API Endpoints](#api-endpoints)
    -[Users](#users)
    -[Products](#products)
    -[Orders](#orders)
    -[Order Products](#order-products)
 -[Data Schema](#Data-Schema)
    -[Users Schema](#users-schema)
    -[Products Schema](#products-schema)
    -[Orders Schema](#orders-schema)
    -[Ordered Products Schema](#ordered-products-schema)
 -[Data Shapes](#data-shapes)
    -[User](#user)
    -[Product](#product)
    -[Order](#order)
    -[Order Product](#order-product)


## API Endpoints


### Users 

--Create -
 -HTTP verb `POST`
 -Endpoint:-`/api/users/` 
 -Request Body

 ```json 
         "email":"test@test.com",
         "user_name":"testuser",
         "first_name":"first",
         "last_name":"user",
         "password":"test123",
 ```
-Responese Body -- `User object`

 ```json
   {
      "status":"success",
      "data":{
         "user":
            {
               "id":1 ,
               "email":"test@test.com",
               "user_name":"testuser",
               "first_name":"first",
               "last_name":"user",
               "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas",
            }
         },
      "message":"User created successfully"
   }
   ```

--Get Many - **`token required`**
 -HTTP verb `GET`
 -Endpoint:-`/api/users/`
 -Request Body

 ```json
   N/A
 ```

 -Responese Body -- `Array of user object`

 ```json
   {
      "status":"success",
      "data":{
         "users":[
            {
               "id":1 ,
               "email":"test@test.com",
               "user_name":"testuser",
               "first_name":"first",
               "last_name":"user"
            }
         ]
      },
      "message":"Users retrieved successfully"
   }
   ```

--Get One - **`token required`**
 -HTTP verb `GET`
 -Endpoint:-`/api/users/:id` - **id of the user to be shown**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `User object`

 ```json
   {
      "status":"success",
      "data":{
         "user":
            {
               "id":1 ,
               "email":"test@test.com",
               "user_name":"testuser",
               "first_name":"first",
               "last_name":"user"
            }
         },
      "message":"User retrieved successfully"
   }
   ```
--Update One - **`token required`**
 -HTTP verb `PATCH`
 -Endpoint:-`/api/users/:id` - **id of the user to be shown**
 -Request Body


**The required update**
 ```json  
   {
         "user_name":"updated testuser",
         "last_name":"updateduser"

   }
 ```
-Responese Body -- `Update user object`

 ```json
   {
      "status":"success",
      "data":{
         "user":
            {
               "id":1 ,
               "email":"test@test.com",
               "user_name":"updated testuser",
               "first_name":"first",
               "last_name":"updateduser"
            }
         },
      "message":"User updated successfully"
   }
   ```   

--Delete One - **`token required`**
 -HTTP verb `DELETE`
 -Endpoint:-`/api/users/:id` - **id of the user to be deleted**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Deleted user object`

 ```json
   {
      "status":"success",
      "data":{
         "user":
            {
               "id":1 ,
               "email":"test@test.com",
               "user_name":"testuser",
               "first_name":"first",
               "last_name":"user"
            }
         },
      "message":"User deleted successfully"
   }
   ```

--Authenicate - **`token required`**
 -HTTP verb `POST`
 -Endpoint:-`/api/users/authenticate`
 -Request Body

 ```json
   {
   "user_name":"testuser",
   "password":"test123"
   }
 ```
-Responese Body -- `Authenticated user object`

 ```json
   {
      "status":"success",
      "data":{
            "id":1 ,
            "email":"test@test.com",
            "user_name":"testuser",
            "first_name":"first",
            "last_name":"user",
            "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas"
         },
      "message":"User Authenticated successfully"
   }
   ```


### Products 


--Create -**`token required`**
 -HTTP verb `POST`
 -Endpoint:-`/api/products/` 
 -Request Body

 ```json 
         "product_name":"test product",
         "product_descrip":"Test Product 1",
         "price":"100'
 ```
-Responese Body -- `Product object`

 ```json
   {
      "status":"success",
      "data":{
         "product":
            {
               "id":1 ,
               "product_name":"test product",
               "product_descrip":"Test Product 1",
               "price":"100"
            }
         },
      "message":"Product created successfully"
   }
   ```

--Get Many - 
 -HTTP verb `GET`
 -Endpoint:-`/api/products/`
 -Request Body

 ```json
   N/A
 ```

 -Responese Body -- `Array of Products object`

 ```json
   {
      "status":"success",
      "data":{
         "products":[
            {
               "id":1 ,
               "product_name":"test product",
               "product_descrip":"Test Product 1",
               "price":"100"
            }
         ]
      },
      "message":"Products retrieved successfully"
   }
   ```

--Get One - 
 -HTTP verb `GET`
 -Endpoint:-`/api/products/:id` - **id of the product to be shown**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Product object`

 ```json
   {
      "status":"success",
      "data":{
         "product":
            {
               "id":1 ,
               "product_name":"test product",
               "product_descrip":"Test Product 1",
               "price":"100"
            }
         },
      "message":"Product retrieved successfully"
   }
   ```


--Delete - **`token required`**
 -HTTP verb `DELETE`
 -Endpoint:-`/api/products/:id` - **id of the product to be deleted**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Deleted product object`

 ```json
   {
      "status":"success",
      "data":{
         "product":
            {
               "id":1 ,
               "product_name":"test product",
               "product_descrip":"Test Product 1",
               "price":"100"
            }
         },
      "message":"Product deleted successfully"
   }
   ```

--Update One - **`token required`**
 -HTTP verb `PATCH`
 -Endpoint:-`/api/products/:id` - **id of the product to be shown**
 -Request Body

**The required update**
 ```json  
   {
         "price":"200",
   }
 ```
-Responese Body -- `Update product object`

 ```json
   {
      "status":"success",
      "data":{
         "product":
            {
               "id":1 ,
               "product_name":"test product",
               "product_descrip":"Test Product 1",
               "price":"200"
            }
         },
      "message":"Product updated successfully"
   }
   ```   


### Orders 


--Create - **`token required`**
 -HTTP verb `POST`
 -Endpoint:-`/api/orders/` 
 -Request Body

 ```json 
      {
         "user_id":1
      }
 ```
-Responese Body -- `Order object`

 ```json
   {
      "status":"success",
      "data":{
         "order":
            {
               "id": 1 ,
               "user_id": 1,
               "status":"Active"
            }
         },
      "message":"Order created successfully"
   }
   ```
--Get Many - **`token required`**
 -HTTP verb `GET`
 -Endpoint:-`/api/orders/`
 -Request Body

 ```json
   N/A
 ```

 -Responese Body -- `Array of Orders object`

 ```json
   {
      "status":"success",
      "data":{
         "orders":[
            {
               "id": 1 ,
               "user_id": 1,
               "status":"Active"
            }
         ]
      },
      "message":"Orders retrieved successfully"
   }
   ```

--GET One - **`token required`**
 -HTTP verb `GET`
 -Endpoint:-`/api/orders/:id` - **id of the user to show the connected order**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Order object`

 ```json
   {
      "status":"success",
      "data":{
         "product":
            {
               "id": 1 ,
               "user_id": 1,
               "status":"Active"
            }
         },
      "message":"Order retrieved successfully"
   }
   ```


--Delete - **`token required`**
 -HTTP verb `DELETE`
 -Endpoint:-`/api/order/:id` - **id of the order to be deleted**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Deleted order object`

 ```json
   {
      "status":"success",
      "data":{
         "order":
            {
               "id": 1 ,
               "user_id": 1,
               "status":"Active"
            }
         },
      "message":"Order deleted successfully"
   }
   ```

--Update One - **`token required`**
 -HTTP verb `PATCH`
 -Endpoint:-`/api/orders/:id` - **id of the order to be updated**
 -Request Body

**The required update**
 ```json  
   {
         "status":"Completed"
   }
 ```
-Responese Body -- `Update order object`

 ```json
   {
      "status":"success",
      "data":{
         "order":
            {
               "id": 1 ,
               "user_id": 1,
               "status":"Completed"
            }
         },
      "message":"Order updated successfully"
   }
   ```   





### Order Product

--Add products - **`token required`**

 -HTTP verb `POST`
 -Endpoint:-`/api/orders/id/products` **id of the order to add the product to this order**
 -Request Body

 ```json 
      {
         "quantity":10,
         "order_id": 1,
         "product_id": 1
      }
 ```
-Responese Body -- `Ordered Product object`

 ```json
   {
      "status":"success",
      "data":{
         "order":
            {
               "id": 1 ,
               "quantity":10,
               "order_id": 1,
               "product_id": 1,
               "product": {
                    "id": 1,
                    "product_name": "test product",
                    "product_descrip": "Test Product 1",
                    "price": 100
                }
            }
         },
      "message":"Product Added-successfully"
   }
   ```

--Get products - **`token required`**
 -HTTP verb `GET`
 -Endpoint:-`/api/orders/id/products` **id of the order to get the products of this order**
 -Request Body

 ```json
   N/A
 ```

 -Responese Body -- `Array of Products of order object`

 ```json
   {
      "status":"success",
      "data":{
         "orders":[
            {
               "id": 1 ,
               "quantity":10,
               "order_id": 1,
               "product_id": 1,
               "products": {
                    "id": 1,
                    "product_name": "test product",
                    "product_descrip": "Test Product 1",
                    "price": 100
               }
            }
         ]
      },
      "message":"Products retrieved successfully"
   }
   ```


--Delete - **`token required`**
 -HTTP verb `DELETE`
 -Endpoint:-`/api/order/:id/products` - **id of the order-product to be deleted**
 -Request Body

 ```json
   N/A
 ```
-Responese Body -- `Deleted order-product object`

 ```json
   {
      "status":"success",
      "data":{
         "order":
            {
               "id": 1 ,
               "quantity":10,
               "order_id": 1,
               "product_id": 1,
               "products": {
                    "id": 1,
                    "product_name": "test product",
                    "product_descrip": "Test Product 1",
                    "price": 100
               }
            }
         },
      "message":"Product Removed-Successfully"
   }
   ```



## Data Schema

### Users Schema
```sql
CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   email VARCHAR(50) UNIQUE,
   user_name VARCHAR(50) NOT NULL,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL
);
```


### Products Schema
```sql
CREATE TABLE products(
   id SERIAL PRIMARY KEY,
   product_name VARCHAR(64) NOT NULL,
   product_descrip VARCHAR(255) NOT NULL,
   price integer NOT NULL
);
```


### Orders Schema
```sql
CREATE TABLE orders(
   id SERIAL PRIMARY KEY,
   user_id bigint REFERENCES users(id),
   status VARCHAR(15)
);
```


### Ordered Products Schema
```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```




## Data Shapes

### User
```typescript
type User = {
  id?: number
  email: string
  user_name: string
  first_name: string
  last_name: string
  password: string
}
```


### Product
```typescript
type Product = {
  id?: number
  product_name: string
  product_descrip: string
  price: number
}
```
### Order
```typescript
type Order = {
  id?: number
  user_id: number
  status: string
}
```

### Order Product
```typescript
type Orderedproduct = {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}
```