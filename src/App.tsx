import './App.css';
import 'antd/dist/reset.css';
import React, { createContext, useState } from 'react';

import { UserProvider } from './providers/SignIn';
import Register from './NewComponents/Register/register';
import Login from './NewComponents/Login/Login';
import MovieTable from './NewComponents/MovieTable/MovieTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './providers/movie';
import Contacts from './NewComponents/CloseContacts/Contacts';
import CustomMessage from './NewComponents/CustomMessage/message';
import ListeningIndicator from './NewComponents/Listening/Listening';

function App() {



  return (
    <>
      {/* <UserProvider> */}
      <MovieProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Contacts' element={<Contacts />} />
            <Route path='/message' element={<CustomMessage />} />
            <Route path='/Listening' element={<ListeningIndicator />} />
           {/* <Route path='/MovieTable' element={<MovieTable /> */} 
          </Routes>
        </Router>
      </MovieProvider>
      {/* </UserProvider> */}

    </>
  );
}
export default App