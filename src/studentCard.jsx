/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./componentStyles.css";
import axios from "axios";

const StudentCard = ({ student, setDelete, setEdit }) => {
  const [studentData, setStudentData] = useState({ ...student });
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(false);
  const [nameFieldToggle, setNameFieldToggle] = useState(true);
  const [rollnoFieldToggle, setRollnoFieldToggle] = useState(true);

  useEffect(() => {
    return () => {
      setDeleteButtonDisable(true);
    };
  }, []);
  //function to delete data
  const deleteCard = () => {
    setDeleteButtonDisable(true);
    axios
      .delete(
        `https://studentbackend-lza9.onrender.com/subjects/${studentData.rollNo}`
      )
      .then(() => setDelete((prev) => !prev));
  };
  // function to updata state o change of fields
  const studentDataUpdate = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //function to call api for put request
  const callAPIforPutReq = () => {
    axios.put("https://studentbackend-lza9.onrender.com/subjects", studentData);
  };

  const nameBlur = () => {
    setNameFieldToggle(true);
    callAPIforPutReq();
  };
  const rollnoBlur = () => {
    setRollnoFieldToggle(true);
    callAPIforPutReq();
  };
  return (
    <div className="student-card">
      <div className="student-info">
        {nameFieldToggle ? (
          <p
            onClick={() => {
              setNameFieldToggle(false);
            }}
          >
            Name: {studentData.name}
          </p>
        ) : (
          <input
            value={studentData.name}
            onBlur={nameBlur}
            onChange={(e) => studentDataUpdate(e)}
            name="name"
          />
        )}
        {rollnoFieldToggle ? (
          <p
            onClick={() => {
              setRollnoFieldToggle(false);
            }}
          >
            Roll No: {studentData.rollNo}
          </p>
        ) : (
          <input
            value={studentData.rollNo}
            onBlur={rollnoBlur}
            onChange={(e) => studentDataUpdate(e)}
            type="number"
            name="rollNo"
          />
        )}
        <p>Extra Subject: {studentData.extraSubject}</p>
      </div>

      <div className="student-subjects">
        <h3>Subjects:</h3>
        <ul>
          {studentData.subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>
      <div>
        <button>EDIT</button>
        <button onClick={deleteCard} disabled={deleteButtonDisable}>
          DELETE
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
