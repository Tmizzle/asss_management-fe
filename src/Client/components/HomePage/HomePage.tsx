import React from "react";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";


const menuItems = [
    new MainMenuItem("My Profile", "/MyProfilePage"),
    new MainMenuItem("Finances", "/StudentFinancesPage")
  ];


  export class HomePage extends React.Component {
    
    render() {
        return (
            <><MainMenu items={menuItems}></MainMenu>

            </>
              
            );
          }
        }