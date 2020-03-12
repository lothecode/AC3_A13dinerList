# Favorite Eatplace
a simple web app for user to record his/her favorite restaurant lists.

##	Features
####  User needs to login before use ths app, if there is no account, user can register one
- User can use email to register
- User can use facebook to register/login

####  Users can only see their own list, can't see others'
####  The passsword store in the database been bcrypt to improve the security 

####  After login, user can add new restaurant data by click "Create new" button. Restaurant's name is mandatory input
####  After login, user can see all favorite restaurants with brief information in database, incluers:
- reataurant name
- restaurant photo
- category of the restaurant
- rating from people ever visited
####  After login, user can see detail information by click diner's photo, name or detail button. There are:
- category of the restaurant
- address and telephone no. of the restaurant
- restaurant's photo and short description 
####  After login, user can update restaurant information by click "Edit" button
####  After login, user can delete restaurant information by click "Delete" button
####  After login, user can search restaurant by name in the search box on the above of home
####  After login, user can sort by restaurant name, category and rating through dropdown menu
####  There sill be warning message showing on the screen when user encountering problems experience login or register pages

##	Getting Started
git clone or download https://github.com/lothecode/AC3_A13dinerList.git to your computer


###	Installing
- open terminal to the folder of this project
- install npm,and install Express.js, mongoose, body-parser, Express-Handlebars, bcryptjs, connect-flash, dotenv, express-session, method-override, passport, passport-local, passport-facebook through npm

#### Mongodb and Robo 3T is required excuting this project
- Create new Database named DinerList via Robo 3T localhost
- Create new Cpllection named diners via Robo 3T in DinerList database
#### note:
- ListSeed.js in folder /models/seeds can be used to create user and diner data from the source file : restaurant.json
- run "npm run dev" in command line, the project is listening on localhost:3000 via express.js
- open browser and go to localhost:3000, the favorite restaurant list is opened
- to break down and end the host, just back to terminal, and use Ctrl+c command


###  Built With
- Visual Studio Code v1.40.1
- Express v4.17.1
- Express-Handlebars v3.1.0
- MongoDB Community Server v4.0.13
- Mongoose v5.7.10