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
      <div>
        <span>Name:</span>
        <input
          name="name"
          onChange={studentDataUpdate}
          value={studentData?.name}
        />
      </div>
      <br />
      <div>
        <span>Roll No:</span>
        <input
          name="rollNo"
          onChange={studentDataUpdate}
          value={studentData.rollNo}
          type="number"
        />
      </div>
      <br />
      <div>
        <span>Extra Subjects</span>
        <input
          type="checkbox"
          name="extraSubject"
          onChange={chkbxChange}
          checked={cbox}
        />
      </div>

      <br />
      {/* multiselect for adding subjects */}
      <MultiSelectComp setStudentData={setStudentData} />
      <button onClick={submit}>submit</button>
    </div>
  );
};
export default Form;
