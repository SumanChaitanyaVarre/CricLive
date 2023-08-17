# CS 387: Project

## Team Members
- Gowri Sriya Mannepalli, 200050043
- Kethavath Sai Yashwanth (200050061)
- Reddy Bhavana (200050117)
- Varre Suman Chaitanya (200050153)


## Installation
Please ensure that all of the npm and react libraries are installed inside the 'server' and 'client' directories respectively, as per    
`package-lock.json`s.


## Code files
There are 2 directories: server (for backend) and client (for frontend)  

**server**  
Before beginning, please open a psql shell in this folder, and execute the following commands:
```bash
\c projectdb
\i criclive.ddl
```
We run the backend (here, server) with the command `node server.js`. It contains the following files, apart from schema.ddl, package.json and package-lock.json.
- db.js: Contains info about database with which we are to establish a connection
- server.js: Contains info about various things such as sessions, and also opens the connection from which we listen for data from frontend
- routes.js: Specifies the various routes we used in the backend
- queries.js: Contains all the queries that are made to the database for rendering various pages and features in the frontend
- controller.js: Contains the functions which execute queries in queries.js and then send data to the frontend

**client**  
We run the frontend (here, client) with the command `npm start`. You can browse through various pages on the localhost at port 3000 upon running both backend and frontend simultaneously.
