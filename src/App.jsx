import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sign from "./Components/Sign/Sign.jsx";
import Form from "./Components/Form/Form.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
