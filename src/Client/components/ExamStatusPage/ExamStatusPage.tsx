import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./ExamStatusPage.css";

const ExamStatusPage: React.FC = () => {
    const reactData = localStorage.getItem("token");
    const [data, setData] = useState<any[]>([])
    const history = useHistory()
    const [event, setEvent] = useState<any[]>([])
    const [colloquiumOnePoints, setColloquiumOnePoints ] = useState("");
    const [colloquiumTwoPoints, setColloquiumTwoPoints] = useState("");
    const [colloquiumThreePoints, setColloquiumThreePoints] = useState("");
    const [subjectID, setSubjectID] = useState("");
    const [indexColl, setIndex] = useState("");
    const [subjectIDPassed, setSubjectIDPassed] = useState("");
    const [eventPassed, setEventPassed] = useState("");
    const [examPoints, setExamPoints] = useState("");
    const [indexPass, setIndexPass] = useState("");

      const handleSubjectIdChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSubjectID(event.target.value);
      };
      const handleSubjectIdPassedChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSubjectIDPassed(event.target.value);
      };
      const handleEventPassedChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setEventPassed(event.target.value);
      };


    function LogOut(){
        localStorage.clear();
      }

      useEffect(() => {
      const url = `http://localhost:8080/api/assigned_profesors/getAssignedSubjectsByLoggedProfesor/?token=${reactData}`;
      const examsByProfesor = () => {
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
                  examsByProfesor();
                }, []);

                const updateColloquiums = () => {
                    const url1 = `http://localhost:8080/api/passed_exams/?index=${indexColl}&subjectID=${subjectID}&colloquiumOne=${colloquiumOnePoints}&colloquiumTwo=${colloquiumTwoPoints}&colloquiumThree=${colloquiumThreePoints}`;
                fetch(url1, {
                method: "PUT",
                headers: {
                  "Authorization": "Bearer " + reactData
                }
                    }).then((res) => 
                        {
                            console.log(res);
                            if(res.status === 200){
                                console.log("Update successful")
                        }
                        })
                        .catch(error => {
                            console.log(error);
                          });
                        }

                        const updateExam = () => {
                            const url2 = `http://localhost:8080/api/passed_exams/passedExam/${reactData}?subjectID=${subjectIDPassed}&index=${indexPass}&examPoints=${examPoints}&eventID=${eventPassed}`;
                        fetch(url2, {
                        method: "PUT",
                        headers: {
                          "Authorization": "Bearer " + reactData
                        }
                            }).then((res) => 
                                {
                                    console.log(res);
                                    if(res.status === 200){
                                        console.log("Update successful")
                                }
                                })
                                .catch(error => {
                                    console.log(error);
                                  });
                                }
                        const url1 = `http://localhost:8080/api/events/examPeriods`;
      useEffect(() => {
        const fetchEvents = async () => {
            fetch(url1, {
              headers: {
                "Authorization": "Bearer " + reactData
              }
                  }).then((response) => response.json())
                    .then((actualData) => {
                    console.log(actualData);
                    setEvent(actualData);
                  }).catch(error => {
                          console.log(error);
                        });
                      }
                      fetchEvents();
          }, []);

    return (
        <>
          <nav className="navbar">
            <ul className="nav-links">
              <li className="nav-link">
                <NavLink to="/homePage">Home Page</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/MyProfilePage">My Profile</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/" onClick={LogOut}>Log out</NavLink>
              </li>
            </ul>
          </nav>
          <div className="card-container" id="cardContainerExamStatus">
            <div className="card" id="CardExamStatus">
              <h2 className="card-title">Update colloquium information</h2>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="examType">Student index:</label>
                  <input id="inputExamStatus" name="examType" onChange={(e) => setIndex(e.target.value)}>
                  </input>
                  <div className="form-group">
                  <label htmlFor="examType">Subject:</label>
                  <select id="inputExamStatus" name="examType" onChange={handleSubjectIdChange}>
                  <option value="">Select</option>
                  {data.map((item, index) => (
          <option value={item.subject.id}>{item.subject.name}</option>
        ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="examType">Colloquium one:</label>
                  <input id="inputExamStatus" name="examType" onChange={(e) => setColloquiumOnePoints(e.target.value)}>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="examType">Colloquium two:</label>
                  <input id="inputExamStatus" name="examType" onChange={(e) => setColloquiumTwoPoints(e.target.value)}>
                  </input>
                </div>
        </div>
        <div className="form-group">
          <label htmlFor="examDate">Colloquium three:</label>
          <input id="inputExamStatus" name="examType" onChange={(e) => setColloquiumThreePoints(e.target.value)}>
                  </input>
                </div>
                <button className="button" id="StudentExamButton" onClick={updateColloquiums}>Submit</button>
              </div>
            </div>
            <div className="card" id="CardExamStatus">
              <h2 className="card-title">Update exam information</h2>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="examType">Subject:</label>
                  <select id="inputExamStatus" name="examType" onChange={handleSubjectIdPassedChange}>
                  <option value="">Select</option>
                  {data.map((item, index) => (
          <option value={item.subject.id}>{item.subject.name}</option>
        ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="examType">Student index:</label>
                  <input id="inputExamStatus" name="examType" onChange={(e) => setIndexPass(e.target.value)}>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="examType">Exam points:</label>
                  <input id="inputExamStatus" name="examType" onChange={(e) => setExamPoints(e.target.value)}>
                  </input>
                </div>
                <div className="form-group">
                  <label htmlFor="examDate">Exam period:</label>
                  <select id="inputExamStatus" name="examType" onChange={handleEventPassedChange}>
                  <option value="">Select</option>
                  {event.map((item, index) => (
          <option value={item.id}>{item.name}</option>
        ))}
                  </select>
                </div>
                <button className="button" id="StudentExamButton" onClick={updateExam}>Cancel</button>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default ExamStatusPage;