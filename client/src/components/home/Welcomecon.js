import React from 'react'

const Welcomecon = ({ user, submithandeler, room, setroom}) => {
    if (!user) {
        return (<div className="row">
            Please do login or signup to start chatting.
        </div>)
    }
    return (
        <div className="row">
            <form onSubmit={submithandeler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Enter the Room Number" id="room" type="text" className="validate" value={room} onChange={e => setroom(e.target.value)} />

                    </div>

                </div>
                <button className="btn">Create Room</button>
            </form>
        </div>
    )
}

export default Welcomecon
