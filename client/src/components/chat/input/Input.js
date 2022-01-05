import React from 'react'
import io from 'socket.io-client';
import { useContext, useState, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';

let socket;

const Input = ({ message, setMessage, sendMessage, room_id, user, setMessages}) => {
    const ENDPT = 'localhost:5000';
    const style = {
        color: 'white',
        margin: '10px',
    };

    useEffect(() => {
        socket = io(ENDPT);

        // console.log(room_id,room_name);
    }, [])
    const deletechats = (event) => {
        event.preventDefault();

        socket.emit('delete-msgs', ({ room_id }));
        console.log(room_id);
        setMessages([]);
    }


    const deleteroom = (event) => {
        event.preventDefault();
        socket = io(ENDPT);

        socket.emit('delete-room', ({ room_id, user }));
        

    }





    return (
        <div>
            <form action="" onSubmit={sendMessage} className="form">
                <input className="input" placeholder="Type a message" type="text" value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage : null} />
                <button className="btn blue" style={style}>Send Message</button>
            </form>
            <button className="btn red" style={style} onClick={deletechats}>Delete all chats</button>
            <button className="btn red" style={style} onClick={deleteroom}>Delete Room</button>
        </div>
    )
}

export default Input
