import React, { useEffect, useState } from 'react';
import './StudentFinancesPage.css';
import { Link, useHistory } from 'react-router-dom';
import { MainMenu, MainMenuItem } from '../MainMenu/MainMenu';

const menuItems = [
  new MainMenuItem("Ispiti", "/StudentExamsPage/"),
  new MainMenuItem("Moj Profil", "/StudentProfilePage/")
];

interface FinancesData {
  note: string;
  currency: string;
  amount: number;
  createdAt: Date;
}


export default function StudentFinancesPage() {
    const reactData = localStorage.getItem("token");
    const [data, setData] = useState<any[]>([])
    const history = useHistory()

    useEffect(() => {
        const url = `http://localhost:8080/api/finances/forStudent/${reactData}`;
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

  return (<>
    <div className="student-finances-page">
    <MainMenu items={menuItems}></MainMenu>
      <div className="header">Finance report</div>
      <table className="finances-table">
        <thead>
          <tr>
            <th>Note</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr>
            <td>{item.note}</td>
            <td>{item.currency}</td>
            <td>{item.amount}</td>
            <td>{item.createdAt}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </>
  );
}