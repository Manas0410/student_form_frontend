/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./componentStyles.css";
import MultiSelectComp from "./multiselect";
import axios from "axios";

const StudentCard = ({ student, setDelete, setEdit }) => {
  const [studentData, setStudentData] = useState({ ...student });
  const [deleteButtonDisable, setDeleteButtonDisable] = useState(false);
  const [nameFieldToggle, setNameFieldToggle] = useState(true);
  const [editFieldToggle, setEditFieldToggle] = useState(true);

  useEffect(() => {
    return () => {
      setDeleteButtonDisable(false);
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

  const chkbxChange = (e) => {
    if (e.target.checked) {
      setStudentData((prev) => {
        let temp = { ...prev };
        temp.extraSubject = "yes";
        return temp;
      });
    }
  };

  const editData = () => {
    setEditFieldToggle(true);
    callAPIforPutReq();
  };

  return (
    <div>
      {editFieldToggle ? (
        <div className="student-card">
          <h3>Roll No. {studentData.rollNo}</h3>
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

          <p>Extra Subject: {studentData.extraSubject}</p>

          <div className="student-subjects">
            <h3>Subjects:</h3>
            <ul>
              {studentData.subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={() => setEditFieldToggle(false)}>EDIT</button>
            <button onClick={deleteCard} disabled={deleteButtonDisable}>
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <div className="student-card">
          <h3>Roll No. {studentData.rollNo}</h3>
          <div>
            Name:
            <input
              value={studentData.name}
              onChange={(e) => studentDataUpdate(e)}
              name="name"
            />
          </div>
          <div>
            <span>Extra Subjects</span>
            <input type="checkbox" name="extraSubject" onChange={chkbxChange} />
          </div>
          <div className="selectItem">
            <MultiSelectComp setStudentData={setStudentData} />
          </div>

          <button onClick={editData}>SAVE</button>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
