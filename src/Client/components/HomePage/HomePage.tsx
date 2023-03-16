import React from "react";
import { Card, Container } from "react-bootstrap";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";


const menuItems = [
    new MainMenuItem("Button", "")
  ];


  export class HomePage extends React.Component {
    render() {
        return (
            <><MainMenu items={menuItems}></MainMenu>

            </>
              
            );
          }
        }