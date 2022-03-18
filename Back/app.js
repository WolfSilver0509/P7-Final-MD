const express = require('express');
const app = express();
const mysql = require('mysql2');
const ModelManager = require("./models/index")
const path = require('path');

const sequelize = require('./models/connector');


require('dotenv').config();

//Cors repris 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//POST
app.use(express.json());

try {
    sequelize.authenticate();

    sequelize.sync({alter:true}); // Clé limité attention - 

    
    const mm = new ModelManager();
    mm.init()


   console.log('La Connection est bien établis .');
 } catch (error) {
   console.error('Impossible de se connecter à la base de donnée :', error);
 }



// init 

// Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userR');
const postRoute = require('./routes/postR');
const commentRoute = require('./routes/commentR');



app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/', (req, res, next) => {
    res.status(200).json('Réponse ici')
})



module.exports = app;