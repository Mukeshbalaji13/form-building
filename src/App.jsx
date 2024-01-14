//App.jsx
import React from 'react';
import './App.css';
import { LoginPage } from './LoginPage';
import { SignUp } from './SignUpPage';
import { Dashboard } from "./Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormBuilder from './FormBuilder';
import { FormPreView } from './FormPreView';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/formbuilder/:formName' element={<FormBuilder />} />
        <Route path='/formbuilder/preview/:previewformName' element={<FormPreView/>}/>
      </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
