# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index /api/products
- Show (args: product id) **end point:** /api/products/:id **method:** GET
- Create [args: Product](token required) **end point:** /api/products **method:** POST

#### Users

- login[Not_Requirement] **end point:** /api/login **method:** POST (please note its not a project requirement but to get a token )
- register[Not_Requirement] **end point:** /api/register **method:** POST (to can initial a user without token)
- Index [token required] **end point:** /api/users **method:** GET
- Show [args: id](token required) **end point:** /api/users/:id **method:** GET
- Create [args: User](token required) /api/users **method:** POST

#### Orders

- create order[Not_Requirement] **end point:** /api/users/orders **method:** POST (please note its not a project requirement but to can get orders )
- Current Order by user [args: user id](token required) **end point:** /api/users/:id/orders **method:** GET

## Data Shapes

#### Product

name        | type          | constrains
---         | ---           | ---
id          | INTEGER       | PRIMARY KEY
name        | VARCHAR(50)   | UNIQUE
price       | INT           |
category    | VARCHAR(50)   |

#### User

name        | type          | constrains
---         | ---           | ---
id          | INTEGER       | PRIMARY KEY
firstName   | VARCHAR(50)   | UNIQUE
lastName    | VARCHAR(50)   |
password    | VARCHAR(100)  |

#### Order

name        | type          | constrains
---         | ---           | ---
id          | INTEGER       | PRIMARY KEY
user_id     | INTEGER        | forign key
status      | order_status(custom type)  | DEFAULT 'active'

#### order_products

name        | type          | constrains
---         | ---           | ---
id          | INTEGER       | PRIMARY KEY
order_id    | INTEGER        | forign key
product_id  | INTEGER        | forign key
quantity    | INTEGER  
