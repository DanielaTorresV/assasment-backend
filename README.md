# Assasment-backend

This is an initial version of FAVS API.
In this document you find the correctly way to use the API.

## External Dependencies

To this project we need to install the next dependencies:

- Nodejs, bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose and morgan.
- Development dependencie: Nodemon and cross-env

This project has a few of test to prove its operation, this tanks to jest, testing in 76.5%.

Besides you need the tool Postamn to test the requests.

To install all modules you need put in the terminal: npm install.

## How to Run and to test the API

1. You need to register on the API and then you can use it, to the register you give a valid email besides a
   password, this must have at least a lowercase letter, a capital letter and a number. Its length must be a minimun of
   8 characters. Don´t forget this two parameters you need the same email and password when you are going to use the
   API again because it will be a Login.

Registro: http://localhost:8080/users/register
Ejm: {
"email" : "johndoe@gmail.com",
"password" : "Abcd12345"
}

Login: http://localhost:8080/users/login
Ejm: {
"email" : "johndoe@gmail.com",
"password" : "Abcd12345"
}

2. When you are logged, you have a token (AUTHORIZATION: Bearer token) with this you can use the next requests.

3. Following you see the requests that you can do:

   - To delete and user (DELETE: http://localhost:8080/users/) - With Authorization.
   - To create your list of favorites (POST: http://localhost:8080/listsFavs) - here you have 4 options to the lists "Clothes", "Music", "Pets", "Food".
     Ejm: {
     "name" : "Clothes"
     } With Authorization.
   - To find lists of favorites for user (GET: http://localhost:8080/listsFavs) With Authorization.
   - To find one list of favorites for unique id (GET: http://localhost:8080/listsFavs/:idListFavs) With Authorization.
   - To delete one list of favorites for unique id (DELETE: http://localhost:8080/listsFavs/:idListFavs) With Authorization.
   - To create your favorite with an unique id to the list of favorites (POST: http://localhost:8080/favs/idListFavs)
     Ejm: {
     "title" : "Shorts",
     "description" : "I love this to the summer",
     "link" : "https://www.lavanguardia.com/comprar/20200823/482955090307/shorts-vaqueros-tendencia-verano-comprar.html"
     } With Authorization.
   - To find one favorite for unique id (GET: http://localhost:8080/favs/:idFav) With Authorization.
   - To delete one favorite for unique id (DELETE: http://localhost:8080/favs/:idFav) With Authorization.

   4. Finalmente se hizo despliegue en heroku para las pruebas: https://asessback-daniela.herokuapp.com/
