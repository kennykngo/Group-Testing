const path = require('path');
const http = require('http');
// const express = require(`express`);
//socket.io
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();

const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));



const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({
        username,
        room
    }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Enables the use of .env files
require("dotenv").config();

// // Configure express input / output
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./client"));

// We need to use sessions to keep track of our user's login status
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Initializes passport
app.use(passport.initialize());
app.use(passport.session());

// Brings in my routes
const logRoutes = require("./routes/log-routes.js");
const apiRoutes = require("./routes/api-routes.js");
const clientRoutes = require("./routes/client-routes.js");
const profileRoutes = require("./routes/profile-routes.js");

// use routes
app.use(clientRoutes, apiRoutes, logRoutes, profileRoutes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});