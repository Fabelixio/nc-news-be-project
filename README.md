# Northcoders News API

In order for this repository to be run as intended, you must update the repo to contain the necessary .env files. At the root level of the project, create two .env files titles .env.test and .env.development.

Once these have been created in the test file add the line "PGDATABASE=nc_news_test" and in the development file add "PGDATABASE=nc_news_test". Once these have been added simply ensure that your .gitignore file contains the line ".env.*" and the project is ready to be run locally.