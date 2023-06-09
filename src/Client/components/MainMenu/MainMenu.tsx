import React from 'react';
import { Nav } from 'react-bootstrap';
import './MainMenu.css';
import {HashRouter, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'


export class MainMenuItem{
    text: string = '';
    link: string = '#';

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }

}
    const Logout = () => {
        localStorage.clear()
        window.location.reload()
    }

interface MainMenuProperties{
    items: MainMenuItem[];
}

interface MainMenuState{
    items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
    state: MainMenuState;

    constructor(props: Readonly<MainMenuProperties>) {
        super(props);

        this.state = {
            items: props.items,
        }
    }

    // New Set of items

    setItems( items: MainMenuItem[] ){
        this.setState({
            items:items,
        })
    }
    render() {
        return(
          <Nav className='navBar' id='navBar' variant="tabs">
            <HashRouter>
           {this.state.items.map(this.makeNavLink)}
           </HashRouter>
           <div className='buttons' id='nav-linkMM'>
           <Link to= "/" className="nav-link" id='nav-linksMM' onClick={Logout}>
                Izloguj se
             </Link>
            </div>
          </Nav>

        );
    }
    private makeNavLink(item: MainMenuItem){
        
        return(
            <div className='buttons' id='nav-linkMM'>
                
             <Link to= {item.link} className="nav-link" id='nav-linksMM'>
                {item.text}
             </Link>
            </div>     
            
        )
    }
}