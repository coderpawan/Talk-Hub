import React from 'react'
import { Room } from './Room'
import { Link } from 'react-router-dom';

const RoomList = ({ rooms,user,setrooms}) => {
    if(!user)
    {
        return (
            <div>
                
            </div>
        )
    }
    return (
        <div>
            {
                rooms.map(room => (
                    <Link to={'/chat/'+room._id+'/'+room.name} key={room._id}> 
                        <Room name={room.name} user={user} room_id={room._id} rooms={rooms} setrooms={setrooms}/>
                    </Link>

                ))
            }
        </div>
    )
}

export default RoomList
