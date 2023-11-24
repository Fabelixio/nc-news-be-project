# Northcoders News API


Welcome to my Northcoders News API, a REST API project built using Express/Node.js that aims to simulate a real world backend serice. It allows users to interact with the database through a number of different endpoints, with data divided into topics, articles, users and groups.


## Hosted Version

You can check out the API in action [here.](https://nc-news-project-ek11.onrender.com)


## Version Requirements
* Node.js: Version 18.17.1 or above
* PostgreSQL: Version 16.1 or above

## Getting Started

### Cloning

* Run `git clone <url>` to clone the database locally

### Dependencies

* To install the projects dependencies run `npm install`. This project utilises dotenv, express, jest, supertest, jest-sorted, jest-extended, pg and pg-format. All of these can be installed individually if `npm install` fails to install them.

### Seeding the database

* Once the dependencies are installed you can create the initial databases with the following command: `npm run setup-dbs`
* After the databases have been initialised you can seed them with data with the command `npm run seed`

### Environment Variables

* In order for this repository to be run as intended, you must add the necessary .env files. At the top level of the project, create two .env files titles `.env.test` and `.env.development.`

* Once these have been created in the test file add the line `PGDATABASE=nc_news_test` and in the development file add `PGDATABASE=nc_news`. Once these have been added ensure that your .gitignore file contains the line `.env.*` and `node_modules` and the project is ready to be run locally.

### Testing

* Tests are contained in the `__tests__` folder and can be run with `npm run test`
* Individual test suites can be run by specifying their file e.g `npm run test app`
* The test database will be reseeded before the tests run to ensure it avoids mutation