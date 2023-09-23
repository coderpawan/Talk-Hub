import React from "react";

const Navbaruser = () => {
  const logout = async () => {
    localStorage.removeItem("loginData");
  };
  return (
    <div>
      <nav>
        <div class="nav-wrapper green darken-10">
          <a href="#!" class="brand-logo right">
            Pawan Talk Hub
          </a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class="left hide-on-med-and-down">
            <li onClick={logout}>
              <a href="/">Logout</a>
            </li>
            <li>
              <a href="/signup">Sign-up</a>
            </li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <li onClick={logout}>
          <a href="/">Logout</a>
        </li>
        <li>
          <a href="/signup">Sign-up</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbaruser;
