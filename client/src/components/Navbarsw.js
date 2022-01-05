import React from 'react'
import Navbarhome from './home/Navbarhome'
import Navbaruser from './home/Navbaruser'

const Navbarsw = ({user}) => {

    if(user)
    {
        return <Navbaruser/>
    }
    return <Navbarhome/>
}

export default Navbarsw
