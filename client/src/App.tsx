import React from 'react';
import Home from './page/Home/Home'
import Puppy from './page/Puppy';
import './global.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Puppy />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
