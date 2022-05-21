import React from 'react'
import io from 'socket.io-client';
// import { useContext, useState, useEffect } from "react";
let socket;

export const Room = ({ name,user,room_id,rooms,setrooms}) => {
    const ENDPT = 'https://ashutoshchatroom.herokuapp.com';
    const style = {
        color: 'white',
     
    };
    const deleteroom = (event) => {
        event.preventDefault();
        socket = io(ENDPT);
        socket.emit('delete-room', ({ room_id, user }));
        console.log("delete the room");
        setrooms(rooms.filter(roo => roo._id !== room_id));
    }
    return (

        <div className="card horizontal green">

            <div className="card-stacked">
                <div className="card-content">
                    <p style={style} className="left">{name}</p><i className="material-icons right" style={style} onClick={deleteroom}>delete</i>
                    
                </div>

            </div>
        </div>
    )
}
