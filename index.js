const express = require('express');
const { Socket } = require('socket.io');

const path = require('path');

require('dotenv').config();

///App express
const app = express();


///Node SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err)

    console.log('sucess server conection');
});