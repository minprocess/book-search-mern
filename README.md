# 21 MERN: Book Search Engine

## Description
This MERN stack app has a Google Books API search engine with Apollo server for GraphQL. Users must either sign up or login. When users search the Google API and are presentd the results, the user can save that particular result. The link to the Heroku deployment of this app is  
https://book-search-mern-2542.herokuapp.com/

Starter code was provided by the UPenn/Trilogy coding bootcamp for full stack web developers.

## Installation
The link to the GitHub repository is https://github.com/minprocess/book-search-mern

Dependencies can be installed with 
npm install

The version of this app deployed on Heroku saves users on Mongo Atlas cloud server. If you deploy to your own Heroku account you will have to have your own account on Mongo Atlas website. You'll also need to set the MONGODB_URI key in the Config Vars section of the Settings for your Heroku app.

It is not necessary to seed the mongodb because User is the only collection. Each User has an array of saved books

To compile this app and run both the client and server simulataneously on your PC run this command
`npm run develop`

## Usage

   ![alt test](assets/front-page-showing-search-results.png)