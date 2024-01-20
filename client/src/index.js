import React from 'react'
import './index.css'
import CreateAccount from './CreateAccount'

import ReactDOM from 'react-dom/client'
import LoginPage from './Login.js'
import StudentDashboard from './DashboardStudent.js'
import ProfessorDashboard from './DashboardProfessor.js'
import { HashRouter, Routes, Route } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<CreateAccount />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/dashboard-professor' element={<ProfessorDashboard />} />
      <Route path='/dashboard-student/:studentId' element={<StudentDashboard />} />
    </Routes>
  </HashRouter>
)