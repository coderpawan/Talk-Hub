const express = require('express');
const app = express();
const cors = require('cors')
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser')
const { OAuth2Client } = require('google-auth-library');
dotenv.config();
const client = new OAuth2Client(process.env.oath);
var corsOptions = {
    origin: 'https://brave-elion-16c499.netlify.app',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}
const authRoutes = require('./Routes/authRoutes');
app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);

const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io');
const users = [];

app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'Tony');
    res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 });
    res.send('cookies are set');
})
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
})
const addUser = ({ socket_id, name, user_id, room_id }) => {
    const exist = users.find(user => user.room_id === room_id && user.user_id === user_id);
    if (exist) {
        return { error: 'User already exist in this room' }
    }
    const user = { socket_id, name, user_id, room_id };
    users.push(user)
    console.log('users list', users)
    return { user }
}

const removeUser = (socket_id) => {
    const index = users.findIndex(user => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}


const getUser = (socket_id) => users.find(user => user.socket_id === socket_id)

const io = socketio(http);
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err))

const Message = require('./Models/Message');
const PORT = process.env.PORT || 5000;
const Room = require('./Models/Room');


const deletemsgs = async (room_id) => {

    await Message.deleteMany(room_id);

}
const deleteroom = async (room_id) => {

    await Room.findByIdAndDelete(room_id.room_id);

}

io.on('connection', (socket) => {
    console.log(socket.id);
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        // console.log('Then room name received is ', name)
        const room = new Room({ name });
        room.save().then(result => {
            io.emit('room-created', result);
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error)
        } else {
            console.log('join user', user)
        }
    })

    socket.on('sendMessage', (message, room_id,user, callback) => {

        console.log("message recived");

        const msgToStore = {
            name: user.name,
            user_id: user._id,
            room_id,
            text: message
        }

        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit("message", result);
            callback();
        })


    })

    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        })
    })
    socket.on('delete-msgs', room_id => {

        console.log(room_id);
        deletemsgs(room_id);
        // io.emit("room-deleted",room_id.room_id)
        console.log("recived by the server");

    })
    socket.on('delete-room',room_id => {

        // io.emit('room-deleted', room);
        
    

        deletemsgs(room_id);
        deleteroom(room_id);


       


        console.log("recived by the server room");
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })

});


app.get('/', (req, res) => {
    res.send("Welcome to server");
});

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.audi,
    });
    const { name, email, sub } = ticket.getPayload();
    res.status(201);
    res.json({ name, email, sub });

});


http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} `);
});