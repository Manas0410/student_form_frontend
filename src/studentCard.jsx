/* eslint-disable react/prop-types */
import "./componentStyles.css";

const StudentCard = ({ student }) => {
  console.log(student, "data from api");
  const {
    rollNo = "NA",
    name = "NA",
    extraSubject = "NA",
    subjects = [],
  } = student;

  return (
    <div className="student-card">
      <div className="student-info">
        <h2>Name: {name}</h2>
        <p>Roll No: {rollNo}</p>
        <p>Extra Subject: {extraSubject}</p>
      </div>

      <div className="student-subjects">
        <h3>Subjects:</h3>
        {/* <ul>
          {subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default StudentCard;
