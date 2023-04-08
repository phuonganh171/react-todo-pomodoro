import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import'./App.css';
import Pomodoro from './components/Pomodoro';
import TodoList from './components/TodoList';
import SettingsContext from './SettingsContext'
import { useState } from 'react';

function App() {

  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  return (
  <main>
    <SettingsContext.Provider value={{
      workMinutes,
      breakMinutes,
      setWorkMinutes,
      setBreakMinutes
    }}>

      <div className="todo-app">
            <Router>
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/Pomodoro" element={<Pomodoro />} />
              </Routes>
            </Router>
      </div>

    </SettingsContext.Provider>

    
  </main>
  );
}

export default App;
