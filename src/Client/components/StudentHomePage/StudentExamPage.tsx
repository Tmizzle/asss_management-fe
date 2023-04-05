import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./StudentExamsPage.css";
import Popup from "../../PopUpWindow/Popup";
import { MainMenu, MainMenuItem } from '../MainMenu/MainMenu';

const menuItems = [
  new MainMenuItem("Finansije", "/StudentFinancesPage"),
  new MainMenuItem("Moj profil", "/StudentProfilePage/"),
];

const StudentExamsPage: React.FC = () => {
    const [professor, setProfessor] = useState("");
    const [subjectRegister, setSubjectRegister] = useState("");
    const [subjectCancel, setSubjectCancel] = useState("");
    const [event, setEvent] = useState("");
    const reactData = localStorage.getItem("token");
    const [data, setData] = useState<any[]>([])
    const [subjects, setSubjects] = useState<any[]>([])
    const [submit, setSubmit] = useState<any[]>([])
    const [eventInfo, setEventInfo] = useState<any[]>([])
    const history = useHistory()
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const handleProfessorChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setProfessor(event.target.value);
      };
      
      const handleSubjectChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSubjectRegister(event.target.value);
      };

      const handleEventChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setEvent(event.target.value);
      };
      
      const handleSubjectCancelChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSubjectCancel(event.target.value);
      };

    function LogOut(){
      localStorage.clear();
    }
    const handlePopupClose = () => {
      setShowPopup(false);
    };


    const url = `http://localhost:8080/api/employee/getProfessors/`;
    useEffect(() => {
    const fetchUser = async () => {
        fetch(url, {
          headers: {
            "Authorization": "Bearer " + reactData
          }
              }).then((response) => response.json())
                .then((actualData) => {
                console.log(actualData);
                setData(actualData);
              }).catch(error => {
                      console.log(error);
                    });
                  }
                  fetchUser();
      }, []);

      const url2 = `http://localhost:8080/api/passed_exams/getUnpassedExamsByStudent/?token=${reactData}`;
    useEffect(() => {
    const fetchSubjects = async () => {
        fetch(url2, {
          headers: {
            "Authorization": "Bearer " + reactData
          }
              }).then((response) => response.json())
                .then((SubjectData) => {
                console.log(SubjectData);
                setSubjects(SubjectData);
              }).catch(error => {
                      console.log(error);
                    });
                  }
                  fetchSubjects();
      }, []);

      const url4 = `http://localhost:8080/api/events/examPeriods`;
      useEffect(() => {
        const fetchEvents = async () => {
            fetch(url4, {
              headers: {
                "Authorization": "Bearer " + reactData
              }
                  }).then((response) => response.json())
                    .then((actualData) => {
                    console.log(actualData);
                    setEventInfo(actualData);
                  }).catch(error => {
                          console.log(error);
                        });
                      }
                      fetchEvents();
          }, []);

          const url5 = `http://localhost:8080/api/exams/removeExam/?token=${reactData}&eventID=${event}&subjectID=${subjectCancel}`;
                    const RemoveExam = () => {
                      fetch(url5, {
                        method: "DELETE",
                        headers: {
                          "Authorization": "Bearer " + reactData
                        }
                            }).then((response) => response.json())
                            .then((submitData) => {
                            console.log(submitData);
                            setSubmit(submitData);
                            setPopupMessage(submitData.message);
                            setShowPopup(true);
                          }).catch(error => {
                                    console.log(error);
                                  });
                                }

      const url3 = `http://localhost:8080/api/exams/?token=${reactData}&profesorID=${professor}&subjectID=${subjectRegister}`;
        const SubmitExam = () => {
          fetch(url3, {
            method: 'POST',
            headers: {
              "Authorization": "Bearer " + reactData
            }
                }).then((response) => response.json())
                .then((submitData) => {
                console.log(submitData);
                setSubmit(submitData);
                setPopupMessage(submitData.message);
                setShowPopup(true);
              }).catch(error => {
                        console.log(error);
                        setPopupMessage(error.message);
                        setShowPopup(true);
                      });
                    }
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
      <MainMenu items={menuItems}></MainMenu>
      <div className="card-container" id="cardContainer">
        <div className="card" id="StudentExamCard">
          <h2 className="card-title">Exam Registration</h2>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="examType">Professor:</label>
              <select id="examType" name="examType" onChange={handleProfessorChange}>
        <option value="">Select</option>
        {data.map((item, index) => (
          <option value={item.id}>{item.firstName} {item.lastName}</option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="examDate">Subject:</label>
      <select id="examDate" name="examDate" onChange={handleSubjectChange}>
        <option value="">Select</option>
        {subjects.map((item, index) => (
          <option value={item.subject.id}>{item.subject.name}</option>
        ))}
      </select>
            </div>
            <button className="button" id="StudentExamButton" onClick={ () => SubmitExam() }>Register</button>
          </div>
        </div>
        <div className="card" id="StudentExamCard">
          <h2 className="card-title">Exam Cancellation</h2>
          <div className="card-content">
            <div className="form-group">
              <label htmlFor="examType">Exam Period:</label>
              <select id="examType" name="examType" onChange={handleEventChange}>
              <option value="">Select</option>
        {eventInfo.map((item, index) => (
          <option value={item.id}>{item.name}</option>
        ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="examDate">Subject:</label>
              <select id="examType" name="examType" onChange={handleSubjectCancelChange}>
              <option value="">Select</option>
        {subjects.map((item, index) => (
          <option value={item.subject.id}>{item.subject.name}</option>
        ))}
              </select>
            </div>
            <button className="button" id="StudentExamButton" onClick={ () => RemoveExam() }>Cancel</button>
            {showPopup && (
        <Popup handleClose={handlePopupClose} popupMessage={popupMessage} />
      )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentExamsPage;