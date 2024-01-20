import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('student'); // Implicit student

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  }

  const navigate = useNavigate();
const handleLogin = async (event) => {
    event.preventDefault();
    if (accountType === 'student') {
        try {
            const response = await fetch('/api/students', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const students = await response.json();
                const matchingStudent = students.find((student) => student.email === email && student.password === password);
                const studentId = matchingStudent?.id;
                if (matchingStudent) {
                    console.log(matchingStudent);
                    navigate(`/dashboard-student/${studentId}`, { state:{student:matchingStudent} });
                } else {
                    alert('Authentication failed.');
                    // Authentication failed, you can display an error message
                    console.error('Authentication failed.');
                }
            } else {
                // Authentication failed, you can display an error message
                console.error('Authentication failed.');
            }
        } catch (error) {
            // Handle errors here
            console.error('Authentication error:', error);
        }
    }
    else if (accountType === 'professor') {
        try {
            const response = await fetch('/api/professors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const professors = await response.json();
                console.log(professors);
                const matchingProfessor = professors.find((professor) => professor.email === email && professor.password === password);

                if (matchingProfessor) {
                    alert('Authentication successful.');
                    console.log(matchingProfessor);
                    navigate('/dashboard-professor',{state:{professor:matchingProfessor}}); // Aici poți să trimiți mai multe date către pagina de dashboard, nu doar profesorul
                    // Authentication successful, do whatever you need to do after authentication
                } else {
                    alert('Authentication failed.');
                    // Authentication failed, you can display an error message
                    console.error('Authentication failed.');
                }
            } else {
                // Authentication failed, you can display an error message
                console.error('Authentication failed.');
            }
        } catch (error) {
            // Handle errors here
            console.error('Authentication error:', error);
        }
    }
};

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="text" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <label>
          Account Type:
          <select value={accountType} onChange={handleAccountTypeChange}>
            <option value="student">Student</option>
            <option value="professor">Profesor</option>
          </select>
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;