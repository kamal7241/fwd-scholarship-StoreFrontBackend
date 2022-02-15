## Instructions to install db-migrate

- Install the global package npm install -g db-migrate
- Install the package to the project yarn add db-migrate db-migrate-pg
- Add a database.json reference file in the root of the project. Later, when we are working with multiple databases - this will allow us to specify what database we want to run migrations on. Here is an example database.json, you will just need to change the database names:
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds",
    "user": "magical_user",
    "password": "password123"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "fantasy_worlds_test",
    "user": "test_user",
    "password": "password123"
  }
}
- Create a migration
  - db-migrate create mythical-worlds-table --sql-file
- Add the SQL you need to the up and down sql files
- Bring the migration up db-migrate up
- Bring the migration down db-migrate down

## repo migrations

- db-migrate create products --sql-file
- db-migrate create statusType --sql-file
- db-migrate create orders --sql-file
- db-migrate create user --sql-file
- db-migrate create addUserInOrders --sql-file
- db-migrate create order_products --sql-file



