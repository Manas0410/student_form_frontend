/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MultiSelectComp from "./multiselect";
import axios from "axios";

const Form = ({ setFlag, flag }) => {
  const [studentData, setStudentData] = useState({
    rollNo: "",
    name: "",
    extraSubject: "no",
    subjects: [],
  });
  const [cbox, setCbox] = useState(false);

  //fxn to set the value from input fields
  const studentDataUpdate = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // function to handle checkbox
  const chkbxChange = (e) => {
    setCbox(true);
    if (e.target.checked) {
      setStudentData((prev) => {
        let temp = { ...prev };
        temp.extraSubject = "yes";
        return temp;
      });
    }
  };
  //function to set data to list on submit
  const submit = () => {
    if (!studentData.rollNo || !studentData.name) {
      return;
    }
    axios
      .post("https://studentbackend-lza9.onrender.com/subjects", studentData)
      .then((response) => {
        console.log(response.data);
        setStudentData({
          rollNo: "",
          name: "",
          extraSub: "no",
          subjects: [],
        });
        setFlag(!flag);
        setCbox(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="form">
      <div className="field">Name:</div>
      <input
        name="name"
        onChange={studentDataUpdate}
        value={studentData?.name}
        className="field"
      />

      <div className="field">Roll No:</div>
      <input
        name="rollNo"
        onChange={studentDataUpdate}
        value={studentData.rollNo}
        type="number"
        className="field"
      />

      <div className="subject-field">
        <div className="field">Extra Subjects</div>
        <input
          type="checkbox"
          name="extraSubject"
          onChange={chkbxChange}
          checked={cbox}
          className="field"
        />
      </div>

      {/* multiselect for adding subjects */}

      <MultiSelectComp setStudentData={setStudentData} />
      <button onClick={submit} className="bn49">
        submit
      </button>
    </div>
  );
};
export default Form;
