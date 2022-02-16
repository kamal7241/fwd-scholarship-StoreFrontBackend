## Storefront Backend Project Guide
## notes
    - .env file had been uploaded for review purpose only
## Database Requirement

- open .env file and copy POSTGRES_DB , POSTGRES_DB_TEST values
- connect psql and  Write this command
- CREATE DATABASE <-- previous .env values -- >
- CREATE USER <-- .env username -- > WITH PASSWORD '<.env password>'

## SETUP

- npm i

## main run scripts

- npm start  
  - starts development server on port 3000
- npm run test-build
  - starts test server on port 5000
