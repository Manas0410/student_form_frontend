/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
import StudentCard from "./studentCard";
import { useEffect, useState } from "react";
import axios from "axios";

const FormDataDisplay = ({ flag }) => {
  const [studentData, setStudentData] = useState([]);
  const [del, setDelete] = useState(true);
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    axios
      .get("https://studentbackend-lza9.onrender.com/subjects")
      .then((data) => setStudentData(data.data));
  }, [flag, del, edit]);

  return (
    <div className="app">
      {studentData.map((student, index) => (
        <StudentCard
          key={index}
          student={student}
          setDelete={setDelete}
          setEdit={setEdit}
        />
      ))}
    </div>
  );
};

export default FormDataDisplay;

// [
//     {
//         "roll-no": "",
//         "name": ""
//         "extra-subject": "",
//         "subjects":[]
//     },
// ]
