import { useState } from 'react';
import { Button, Card, Container, Form, Col } from 'react-bootstrap';
import "./UserLoginPage.css";
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useToken } from '../../context/TokenContext/TokenProvider';
import { Link, useHistory } from 'react-router-dom';
import Popup from "../../PopUpWindow/Popup";

export default function UserLoginPage() {
    /* useStates pick up values from fields in our form */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken } = useToken();
    const history = useHistory()
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const handlePopupClose = () => {
        setShowPopup(false);
      };

    /* doLogin sends body data to Backend function, converts it to json beforehand  */
    const doLogin = () => {
        const url = `http://localhost:8080/api/public/login/authenticate`;
    fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
        email: email,
        password: password
    })

            /* .then Works with res which is return data from backend and tells us if login was sucessful
            stores then token in LocalStorate
            then does a push to homePage
             */
        }).then((res) => 
            {
                if(res.status === 200){
                res.json().then((data) => {
                    if(data.role === "[PROFESOR]"){
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("role", data.role)
                    setToken(data.token)
                    history.push("/homePage")
                }
                else if(data.role === "[STUDENT]"){
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("role", data.role)
                        setToken(data.token)
                        history.push("/StudentExamsPage")
                }
                })
            }
            })
            .catch(error => {
                console.log("test")
                console.log(error);
                setPopupMessage("Wrong information!");
                setShowPopup(true);
              });

    }


    return(
        <Container id='LoginContainer'>
            <Card className="loginCard" id='loginCard'>
                <Col lg="8" md="8" sm="8">
                <Card.Body id='LoginCardBody'>
                    <Card.Title className="logintitleForm">
                        <FontAwesomeIcon icon ={ faArrowAltCircleRight } /> User Login
                    </Card.Title>
                    <Card.Text>
                        <Form className="loginForm">
                            <Form.Group className="logintextForm">
                                <Form.Label ClassName="textField" htmlFOr="email">E-mail:</Form.Label>
                                <Form.Control type="email" id="email"
                                            value={ email }
                                            onChange= { event => setEmail(event.target.value) }/>
                            </Form.Group>
                            <Form.Group className="logintextForm" id='LoginFormGroup'>
                                <Form.Label ClassName="textField" htmlFOr="password">Password:</Form.Label>
                                <Form.Control type="password" id="password"
                                value={ password }
                                onChange= { event => setPassword(event.target.value) }/>
                            </Form.Group>

                            <Link to="/">Forgot your password?</Link>

                            <Form.Group className="loginbuttonForm" id='LoginFormGroup'>
                                <Button className="btn" variant="primary" 
                                onClick={ () => doLogin() }>
                                    Login</Button>
                                    {showPopup && (
                                    <Popup handleClose={handlePopupClose} popupMessage={popupMessage} />
                                    )}
                            </Form.Group>

                            
                            
                        </Form>
                    </Card.Text>
                </Card.Body>
                </Col>
            </Card>
        </Container>
    )
    
}