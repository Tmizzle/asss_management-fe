import React, { useEffect, useState } from "react";
import { MainMenu, MainMenuItem } from "../MainMenu/MainMenu";
import { NavLink, useHistory } from "react-router-dom";
import './HomePage.css';


const menuItems = [
    new MainMenuItem("My Profile", "/MyProfilePage"),
    new MainMenuItem("Finances", "/StudentFinancesPage")
  ];
  function LogOut(){
    localStorage.clear();
  }

  export default function HomePage() {
    const reactData = localStorage.getItem("token");
    const [data, setData] = useState<any[]>([])
    const [exportData, setExportData] = useState<any[]>([])
    const [events, setEvents] = useState<any[]>([])
    const history = useHistory()
    const [event, setEvent] = useState("");

    const handleEventChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
      setEvent(event.target.value);
    };

    const url1 = `http://localhost:8080/api/exams/getExamsByProfesorForEvent/?token=${reactData}&eventID=${event}`;
    const findExams = () => {
      fetch(url1, {
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

                const downloadFile = async (url: RequestInfo | URL, fileName: string) => {
                  const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                      "Authorization": "Bearer " + reactData
                    }
                  });
                  const blob = await response.blob();
                  const fileUrl = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = fileUrl;
                  link.setAttribute('download', fileName);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
                
                const exportExams = async () => {
                  const url = `http://localhost:8080/api/exports/download-exam-report-per-event/?token=${reactData}&eventID=${event}`;
                  try {
                    await downloadFile(url, 'Exam Report.xlsx');
                  } catch (error) {
                    console.error('Error exporting exams:', error);
                  }
                };


          const url = `http://localhost:8080/api/events/examPeriods`;
      useEffect(() => {
        const fetchEvents = async () => {
            fetch(url, {
              headers: {
                "Authorization": "Bearer " + reactData
              }
                  }).then((response) => response.json())
                    .then((actualData) => {
                    console.log(actualData);
                    setEvents(actualData);
                  }).catch(error => {
                          console.log(error);
                        });
                      }
                      fetchEvents();
          }, []);
    
        return (
            <><nav className="navbar">
            <ul className="nav-links">
              <li className="nav-link">
                <NavLink to="/MyProfilePage">My Profile</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/AddNewStudentPage">Add Student</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/ExamStatusPage">Exams</NavLink>
              </li>
              <li className="nav-link">
                <NavLink to="/" onClick={LogOut}>Log out</NavLink>
              </li>
            </ul>
          </nav>

          <div className="container" id="HomePageContainer">
      <div className="search-container">
        <select className="select-field" placeholder="Select" onChange={handleEventChange}>
        <option value="">Select</option>
        {events.map((item, index) => (
          <option value={item.id}>{item.name}</option>
        ))}
        </select>
        <button className="search-button" onClick={findExams}>Search</button>
        <button className="export-button" onClick={exportExams}>Export Excel</button>
      </div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Student name</th>
            <th>Email</th>
            <th>Index</th>
            <th>Course</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr>
            <td>{item.student.firstName} {item.student.lastName}</td>
            <td>{item.student.email}</td>
            <td>{item.student.index}</td>
            <td>{item.student.courseOfStudies}</td>
            <td>{item.subject.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
            </>
              
            );
          }