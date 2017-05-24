# Node.js Express Backend Overview

	
## Run the app locally
1. [Install Node.js][]
2. [Install MongoDB][]
3. Download the source code from this repo.
4. cd into the app directory
5. Run `npm install` to install the app's dependencies
6. cd into the client directory
7. Run `npm install` to install the client frontend dependencies
8. Start mongo db using 'mongod' in the terminal
8. Run `node app.js` to start the app on the root directory
9. Access the running app in a browser at http://localhost:3000 in my case
	
## Update the front end:
1. To update the front end base, just generate a prod build in angular project, copy the content from 'dist/prod' folder and paste at 'client/src' folder and just restart the project.

## Database configs:
1. To manage database configs just go to >  'config/database.yml'
2. To production DB environment just define 'MONGODB_URI' in system enviroments with the URL connection.

## Overview:
1. API routes located at:> 'config/routes.js'
2. All logic located at:> 'app/...'

[Install Node.js]: https://nodejs.org/en/download/
[Install MongoDB]: https://docs.mongodb.com/manual/installation
