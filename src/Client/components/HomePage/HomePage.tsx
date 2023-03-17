import React from "react";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";


const menuItems = [
    new MainMenuItem("My Profile", "/MyProfilePage")
  ];


  export class HomePage extends React.Component {
    render() {
        return (
            <><MainMenu items={menuItems}></MainMenu>

            </>
              
            );
          }
        }