import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";
import "./MyProfilePage.css";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Popup from "../../PopUpWindow/Popup";

const menuItems = [
  new MainMenuItem("Home", "/homePage/"),
];

export default function MyProfilePage() {
  const reactData = localStorage.getItem("token");
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory()
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handlePopupClose = () => {
      setShowPopup(false);
    };
  
  const [user, setUser] = useState({id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    jmbg: 0,
    email: "",
    gender: "",
    birthDate: "",
    createdAt: "",
    employeeCategory: ""
    });

    function LogOut(){
      localStorage.clear();
    }


  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const url = `http://localhost:8080/api/employee/getEmployeeByEmail/?token=${reactData}`;
    const fetchUser = async () => {
      fetch(url, {
        headers: {
          "Authorization": "Bearer " + reactData
        }
            }).then((response) => response.json())
              .then((actualData) => {
              console.log(actualData);
              setUser(actualData);
            }).catch(error => {
                    console.log(error);
                  });
                }
    fetchUser();
  }, []);
  useEffect(() => {
    const checkRole = async () => {
      const role = localStorage.getItem("role");
      if (role !== "[PROFESOR]"){
        localStorage.clear();
        history.push("/")
      }
    }
    checkRole();
  }, []);

  const update = () => {
    const url = `http://localhost:8080/api/employee/${reactData}?firstName=${user.firstName}&lastName=${user.lastName}&middleName=${user.middleName}&email=${user.email}`;
fetch(url, {
method: "PUT",
headers: {
  "Authorization": "Bearer " + reactData
}
    }).then((res) => 
        {
            if(res.status === 200){
              setPopupMessage("Uspesno promenjeno!");
              setShowPopup(true);
              setIsDisabled(true);
        }
        })
        .catch(error => {
            console.log(error);
          });
        }


      const handleClick = () => {
        setIsDisabled(false);
      };

      const handleClickDisable = () => {
        setIsDisabled(true);
      };
  
    return (
      <>
        <MainMenu items={menuItems}></MainMenu>

        <Form.Label className="labelmyprofilePage">
          My Profile
        </Form.Label>

        <Container
          className="containermyprofilePage"
          
        >
          
          <Form className="myprofileForm" style={{ paddingBottom: "10px" }}>
            <Row>
              <Col md="6">
                <Form.Label
                  style={{
                    marginTop: "30px",
                    fontSize: "30px",
                    color: "#000",
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: "20px",
                    fontFamily: "'Source Code Pro', monospace",
                  }}
                >
                  Personal info
                  <FontAwesomeIcon className="pen" icon={faPen} onClick={handleClick} />
                  <FontAwesomeIcon className="check" icon={faCheck} onClick={ () => update() } />
                  {showPopup && (
        <Popup handleClose={handlePopupClose} popupMessage={popupMessage} />
      )}
                </Form.Label>
                <Form.Group>
                  <Form.Label htmlFor="firstName" className="myprofilelabelForm">
                    First name:
                  </Form.Label>

                  <Form.Control 
                  className="controlmyprofileForm"
                  disabled={true}
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}>
                   
                </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="lastName" className="myprofileForm">
                    Last name:
                  </Form.Label>

                  <Form.Control 
                    className="controlmyprofileForm"
                    disabled={isDisabled}
                    type="text"
                    id="lastName"
                    value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="middleName" className="myprofilelabelForm">
                    Middle name:
                  </Form.Label>

                  <Form.Control 
                  className="controlmyprofileForm"
                  disabled={true}
                  type="text"
                  id="middleName"
                  value={user.middleName}
                  onChange={(e) => setUser({ ...user, middleName: e.target.value })}>
                   
                </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="email" className="myprofileForm">
                    Email:
                  </Form.Label>

                  <Form.Control
                    className="controlmyprofileForm"
                    disabled={isDisabled}
                    type="email"
                    id="email"
                    value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="oib" className="registertextForm">
                    JMBG:
                  </Form.Label>

                  <Form.Control
                    className="controlmyprofileForm"
                    disabled={true}
                    type="text"
                    id="jmbg"
                    value={user.jmbg.toString()} // Convert number to string
                    onChange={(e) => setUser({ ...user, jmbg: parseInt(e.target.value) })} // Convert string to number
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label
                    htmlFor="dateOfBirthday"
                    className="myprofileForm"
                  >
                    Date Of Birthday:
                  </Form.Label>

                  <Form.Control
                    className="controlmyprofileForm"
                    disabled={true}
                    type="text"
                    id="dateOfBirthday"
                    value={user.birthDate}
                    onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="gender" className="myprofileForm">
                    Gender:
                  </Form.Label>

                  <Form.Control
                    className="controlmyprofileForm"
                    disabled={true}
                    type="text"
                    id="gender"
                    value={user.gender.charAt(0).toUpperCase() + user.gender.slice(1).toLowerCase()}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  ></Form.Control>
                </Form.Group>
              </Col>
            
              <Col md="6">
                <Form.Label
                  style={{
                    marginTop: "30px",
                    fontSize: "30px",
                    color: "#000",
                    width: "100%",
                    textAlign: "center",
                    paddingBottom: "20px",
                  }}
                >
                  Account info
                </Form.Label>

                <Form.Group>
                  <Form.Label htmlFor="username" className="myprofileForm">
                    Employee position:
                  </Form.Label>

                  <Form.Control
                    className="controlmyprofileForm"
                    disabled={true}
                    type="text"
                    id="employeeCategory"
                    value={user.employeeCategory.charAt(0).toUpperCase() + user.employeeCategory.slice(1).toLowerCase()}
                    onChange={(e) => setUser({ ...user, employeeCategory: e.target.value })}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="createdAccunt" className="myprofileForm">
                    Created Account:
                  </Form.Label>

                  <Form.Control
                    type="text"
                    className="controlmyprofileForm"
                    disabled={true}
                    id="createdAccunt"
                    value={user.createdAt}
                    onChange={(e) => setUser({ ...user, createdAt: e.target.value })}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </>
    );
  }