import React from "react";
import { Routes, Route } from "react-router-dom";
import MultiForm from "./components/MultiForm";
import UsersPages from "./components/UsersPages";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MultiForm />} />
      <Route path="/users" element={<UsersPages />} />
    </Routes>
  );
};

export default App;
