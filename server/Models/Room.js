const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    }

}, { timestamps: true } ,{ typeKey: '$type' });

const Room = mongoose.model('room', roomSchema);
module.exports = Room;