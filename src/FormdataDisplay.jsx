// import { useSelector } from "react-redux";
import StudentCard from "./studentCard";
import { useEffect, useState } from "react";
import axios from "axios";

const FormDataDisplay = ({ flag }) => {
  // const data = useSelector((state) => state.studentDataReducer.data);
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios
      .get("https://studentbackend-lza9.onrender.com/subjects")
      .then((data) => setStudentData(data.data));
  }, []);

  return (
    <div className="app">
      {studentData.map((student, index) => (
        <StudentCard key={index} student={student} />
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
