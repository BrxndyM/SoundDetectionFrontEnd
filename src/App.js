import logo from './logo.svg';
import './App.css';
import MovieTable from './Components/Table/Table';
import Login from './Components/Login/Login';
import RegistrationForm from './Components/Register/Register';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './Components/Register/Register';

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    // <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
    //   <Router>
    //     {isAuthenticated ? <MovieTable /> : <Login />}
    //   </Router>
    // </AuthContext.Provider>
<SignUp/>
    // <RegistrationForm/>
  );
}
export default App