import React from 'react'

const Navbaruser = () => {
    return (
        <div>
            <nav>
                <div class="nav-wrapper green darken-10">
                    <a href="#!" class="brand-logo right">AsHuToSh's ChAtRoOm</a>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="left hide-on-med-and-down">
                        <li><a href="/update">Edit details</a></li>
                        <li><a href="/">Logout</a></li>
                        <li><a href="/signup">Sign-up</a></li>

                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="/update">Edit details</a></li>
                <li><a href="/">Logout</a></li>
                <li><a href="/signup">Sign-up</a></li>

            </ul>
        </div>
         
    )
}

export default Navbaruser
