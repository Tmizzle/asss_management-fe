import React, { useEffect, useState } from "react";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";
import { NavLink, useHistory } from "react-router-dom";
import './HrHomePage.css';


const menuItems = [
    new MainMenuItem("Placeholder", "")
  ];

  export default function HrHomePage() {
    const reactData = localStorage.getItem("token");
    const [data, setData] = useState<any[]>([])


   
    
        return (
            <>
            <MainMenu items={menuItems}></MainMenu>
            </>   
            );
          }