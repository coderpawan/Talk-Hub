import React from 'react';
import './Message.css';

const Message = ({ message: { name, user_id, text }, current_uid }) => {
    let iscurr = false;
    console.log(current_uid);
    if(user_id===current_uid)
    {
        iscurr=true;
    }
    return (
        
        iscurr?(
            <div className="row right-align">
                <div className="col s12 m8 16 right">
                    <p className="sentbyme">{name}:{text}</p>
                </div>
            </div>
        ):(
                <div className="row left-align">
                    <div className="col s12 m8 16 left">
                        <p className="opponent">{name}:{text}</p></div>
                </div>
        )

        
    )
}

export default Message
