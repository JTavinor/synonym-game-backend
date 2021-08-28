# Word Association Game Backend
Created using node.js with express and deployed on heroku

Give it a go at http://jtwordgame.herokuapp.com/

My word association game backend uses express and mongodb to send and retrieve scores, user information, and validate users.

## This project showcases
An ability to create and deploy a node.js app.<br>
Handling GET, POST, PUT and DELETE requests for different routes, icluding parsing route parameters.<br>
Using mongoose to maintain a database in the cloud.<br>
Using express to build an API.<br>
Using schemas to create models and validate request bodies<br>
Setting request statuses and sending error messages in the response.<br>
Hashing and salting passwords.<br>
Sending info via headers.<br>
Using JWT's to verify users.<br>
Using custom and imported middleware, such as cors.<br>
Storing secret variable in a config module using environment variables.<br>
Using Postman in development for testing.<br>

## App
The base app is created using express. It includes checking for the existence of necessary environment variables on startup.<br>
It defines different routes and specifies which modules to use.<br>
It connects to a mongoose database in the cloud, using secret envirnoment variables.

## Models
Using mongoose schemas to define models, including nested schema for subdocuments

##Routes
### Leaderboard
Get the full leaderboard, or only a single users scores, based. on route parameters.<br>
Post new scores to the database, checking whether there is a user logged in, and updating the db accordingly.<br>
Deleting scores from the leaderboard

## Users
Get the current users info, authentication with custom middleware.<br>
Get a users information via id.<br>
Add a new user, checking if username is taken and salting & hashing the password.<br>
Adding, deleting and finding a users wrong words

## Auth
Checks a users credentials when loggin in and return a jwt.

