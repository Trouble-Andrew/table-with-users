import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-dark navbar-expand-lg">
    <div className="navbar-brand">Users App</div>

    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/about">
          Информация
        </NavLink>
      </li>
    </ul>
  </nav>
);
