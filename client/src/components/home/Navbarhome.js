import React from 'react'

const Navbarhome = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper green darken-10">
                    <a href="#!" class="brand-logo right">AsHuToSh ChAtRoOm</a>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="left hide-on-med-and-down">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup">Sign-up</a></li>
                        
                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="/login">Login</a></li>
    
                <li><a href="/signup">Sign-up</a></li>
                
            </ul>
        </div>


    )
}

export default Navbarhome
