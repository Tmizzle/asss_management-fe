import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './AddNewStudentPage.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import Popup from "../../PopUpWindow/Popup";
import { MainMenu, MainMenuItem } from '../MainMenu/MainMenu';

const menuItems = [
  new MainMenuItem("Placeholder", ""),
];

export default function MyProfilePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [index, setIndex] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [budget, setBudget] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const reactData = [localStorage.getItem("token")];
  const [ data, setData] = useState<any[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  const url = `http://localhost:8080/api/students/?token=${reactData}`
  const SendData = () => {
    fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + reactData,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                email: email,
                jmbg: jmbg,
                index: index,
                password: password,
                gender: gender,
                courseOfStudies: course,
                budget: budget,
                birthDate: birthDate
            })
    }).then((res) => res.json())
    .then((actualData) => {
      console.log(actualData);
      setData(actualData as any);
      console.log(data);
      setPopupMessage(actualData.message);
      setShowPopup(true);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

  return (<>

    <MainMenu items={menuItems}></MainMenu>

    
    <div className="add-new-student-page">
  
      <h1 className="text-center my-4">Add New Student Form</h1>
      <Container id='NewStudentContainer'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="firstName">First Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  id="firstName"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  id="lastName"
                />
              </Form.Group >
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="middleName">Middle Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter middle name"
                  value={middleName}
                  onChange={(event) => setMiddleName(event.target.value)}
                  id="middleName"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="jmbg">JMBG:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter JMBG"
                  value={jmbg}
                  onChange={(event) => setJmbg(event.target.value)}
                  id="jmbg"
                />
              </Form.Group >
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="index">Index:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter index"
                  value={index}
                  onChange={(event) => setIndex(event.target.value)}
                  id="index"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="gender">Gender:</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  id="gender"
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="birthDate">Birth Date:</Form.Label>
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  id="birthDate"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="course">Course:</Form.Label>
                <Form.Control
                  as="select"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                  id="course"
                >
                  <option value="">Select course</option>
                  <option value="INFORMATIKA">IT</option>
                  <option value="DRUMSKI_SAOBRACAJ">Drumski saobracaj</option>
                  <option value="PRIVREDNO_INZENJERSTVO">privredno inzenjerstvo</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id='NewStudentFormGroup'>
                <Form.Label htmlFor="budget">Budget:</Form.Label>
                <Form.Control
                  as="select"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  id="budget"
                >
                  <option value="">Select budget</option>
                  <option value="TRUE">Yes</option>
                  <option value="FALSE">No</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>


          <Button type="submit" id="button" onClick={SendData}>Submit</Button>
          {showPopup && (
        <Popup handleClose={handlePopupClose} popupMessage={popupMessage} />
      )}
        </Form>
      </Container>
    </div>
    </>
  );
};
