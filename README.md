## Project We Love Movies

> This project was to build the backend engine for WeLoveMovies application. It sets up databases, and builds out REST API Routes for the WeLoveMovies frontend to access specific data about movies, theaters, and movie reviews. 

## Database Tables

> WeLoveMovies uses a Postgres SQL database hosted on Tiny Turtle. There are 5 DB tables which are used by WeLoveMovies: 

1. critics
2. movies_theaters
3. movies
4. reviews
5. theaters

> Please see docs/tables for more details on each of these tables. 

## APIs

> WeLoveMovies has 3 APIs, which have various routes enabled: 

1. /movies
2. /reviews
3. /theaters

> Please see docs/routes for details on each of the operations which can be served by the backend on these routes. 


## Built With

- Express
- Node.js
- Knex
- PostgreSQL
- CORS

## Running Locally

> In the root directory, run npm install, then npm run start:dev to start the development server. 

## Deployment

> Application is deployed through vercel: 

- [WeLoveMovies](https://vercel.com)