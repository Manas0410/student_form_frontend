import { useState } from "react";
import "./App.css";
import Form from "./Form";
import FormDataDisplay from "./FormdataDisplay";
import "./componentStyles.css";

function App() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <div className="app-container">
        <div className="form-container">
          <Form setFlag={setFlag} flag={flag} />
        </div>
        <div className="data-display-container">
          <FormDataDisplay flag={flag} />
        </div>
      </div>
    </>
  );
}

export default App;
