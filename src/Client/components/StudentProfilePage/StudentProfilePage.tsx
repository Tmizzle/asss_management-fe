import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";
import "./StudentProfilePage.css";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useHistory } from 'react-router-dom';

const menuItems = [
    new MainMenuItem("Home", "/StudentExamsPage/"),
  ];

export default function StudentProfilePage() {
    const reactData = localStorage.getItem("token");
    const [isDisabled, setIsDisabled] = useState(true);
    const history = useHistory()
    
    const [user, setUser] = useState({id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      jmbg: 0,
      email: "",
      gender: "",
      birthDate: "",
      createdAt: "",
      status: "",
      renewed: "",
      index: "",
      courseOfStudies: "",
      yearOfStudies: "",
      budget: "",
      typeOfStudies: "",
      createdBy: "",
      updatedBy: "",
      updatedAt: "",
      });
  
  
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const url = `http://localhost:8080/api/students/getStudentByEmail/?token=${reactData}`;
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
        if (role !== "[STUDENT]"){
          localStorage.clear();
          history.push("/")
        }
      }
      checkRole();
    }, []);
      return (
        <>
          <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/StudentFinancesPage">Finances</Link>
          </li>
          <li className="nav-link">
            <Link to="/StudentExamsPage">Exam Page</Link>
          </li>
        </ul>
      </nav>
  
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
                  </Form.Label>
                  <Form.Group>
                    <Form.Label htmlFor="firstName" className="myprofilelabelForm">
                      First name:
                    </Form.Label>
  
                    <Form.Control 
                    className="controlmyprofileForm"
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                      disabled={true}
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
                    Study info
                  </Form.Label>
  
                  <Form.Group>
                    <Form.Label htmlFor="index" className="myprofileForm">
                      Status:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="status"
                      value={user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase()}
                      onChange={(e) => setUser({ ...user, status: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label htmlFor="index" className="myprofileForm">
                      Index:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="index"
                      value={user.index.charAt(0).toUpperCase() + user.index.slice(1).toLowerCase()}
                      onChange={(e) => setUser({ ...user, index: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label
                      htmlFor="yearOfStudies"
                      className="myprofileForm"
                    >
                      Year of studies:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="yearOfStudies"
                      value={user.yearOfStudies}
                      onChange={(e) => setUser({ ...user, yearOfStudies: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label
                      htmlFor="courseOfStudies"
                      className="myprofileForm"
                    >
                      Course:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="dateOfBirthday"
                      value={user.courseOfStudies}
                      onChange={(e) => setUser({ ...user, courseOfStudies: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label
                      htmlFor="typeOfStudies"
                      className="myprofileForm"
                    >
                      Type of Studies:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="typeOfStudies"
                      value={user.typeOfStudies}
                      onChange={(e) => setUser({ ...user, typeOfStudies: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label
                      htmlFor="budget"
                      className="myprofileForm"
                    >
                      Budget:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="budget"
                      value={user.budget}
                      onChange={(e) => setUser({ ...user, budget: e.target.value })}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label
                      htmlFor="renewed"
                      className="myprofileForm"
                    >
                      Renewed:
                    </Form.Label>
  
                    <Form.Control
                      className="controlmyprofileForm"
                      disabled={true}
                      type="text"
                      id="renewed"
                      value={user.renewed}
                      onChange={(e) => setUser({ ...user, renewed: e.target.value })}
                    ></Form.Control>
                  </Form.Group>
  
                  <Form.Group>
                    <Form.Label htmlFor="createdAccount" className="myprofileForm">
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