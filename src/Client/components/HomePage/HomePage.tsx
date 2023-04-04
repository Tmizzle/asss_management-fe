import React from "react";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";
import { NavLink } from "react-router-dom";


const menuItems = [
    new MainMenuItem("My Profile", "/MyProfilePage"),
    new MainMenuItem("Finances", "/StudentFinancesPage")
  ];
  function LogOut(){
    localStorage.clear();
  }


  export class HomePage extends React.Component {
    
    render() {
        return (
            <><nav className="navbar">
            <ul className="nav-links">
              <li className="nav-link">
                <NavLink to="/MyProfilePage">My Profile</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/AddNewStudentPage">Add Student</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/" onClick={LogOut}>Log out</NavLink>
              </li>
            </ul>
          </nav>

            </>
              
            );
          }
        }