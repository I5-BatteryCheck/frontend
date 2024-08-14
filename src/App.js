import logo from './logo.svg';
import './App.css';
import './Static.css';
import { useState, EventHandler, ReactNode } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Static from './Static.js';
import Production from './Production.js';
import MenuBar from './MenuBar.js';
import Environ from './Environ.js';
import Search from './Search.js';
import Error from './Error.js';
import Search_detail from './search_detail.js';
function App() {
  let navigate = useNavigate();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Production />
            </>
          }
        ></Route>
        <Route
          path="/static"
          element={
            <>
              <Static />
            </>
          }
        ></Route>
        <Route
          path="/environment"
          element={
            <>
              <Environ />
            </>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <>
              <Search />
            </>
          }
        ></Route>
        <Route
          path="/error"
          element={
            <>
              <Error />
            </>
          }
        ></Route>
        <Route
          path="/search_detail"
          element={
            <>
              <Search_detail />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
