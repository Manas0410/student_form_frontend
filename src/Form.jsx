/* eslint-disable react/prop-types */
import { useState } from "react";
import MultiSelectComp from "./multiselect";
import axios from "axios";

const Form = ({ setFlag, flag }) => {
  const [studentData, setStudentData] = useState({
    rollNo: 0,
    name: "",
    extraSubject: "",
    subjects: [],
  });
  // const dispatch = useDispatch();

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

  //function to set data to list on submit
  const submit = () => {
    axios
      .post("https://studentbackend-lza9.onrender.com/subjects", studentData)
      .then((response) => {
        console.log(response.data);
        setStudentData({
          rollNo: 0,
          name: "",
          extraSub: "",
          subjects: [],
        });
        setFlag(!flag);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <span>Name:</span>
      <input
        name="name"
        onChange={studentDataUpdate}
        value={studentData?.name}
      />
      <br />
      <span>Roll No:</span>
      <input
        name="rollNo"
        onChange={studentDataUpdate}
        value={studentData.rollNo}
        type="number"
      />
      <br />
      <span>Extra Subjects</span>
      <input
        type="checkbox"
        name="extraSubject"
        value="yes"
        onChange={studentDataUpdate}
      />

      <br />
      {/* multiselect for adding subjects */}
      <MultiSelectComp setStudentData={setStudentData} />
      <button onClick={submit}>submit</button>
    </div>
  );
};
export default Form;
