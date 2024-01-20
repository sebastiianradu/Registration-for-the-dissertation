import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom'

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('student'); // Implicit student

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };



  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };
   // eslint-disable-next-line
  const handleCreateAccount = async () => {
    if(accountType === 'student') {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("Contul a fost creat cu succes!");
        // Contul a fost creat cu succes
        // Aici poți face ceva, de exemplu, să redirecționezi utilizatorul către pagina de login sau să afișezi un mesaj de succes
      } else {
        // Contul nu a putut fi creat
        // Aici poți afișa un mesaj de eroare utilizatorului
      }
    } catch (error) {
      // Tratează erorile aici
    }
  } else if(accountType === 'professor') {
    try {
      const response = await fetch('/api/professors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        alert("Contul a fost creat cu succes!");
        // Contul a fost creat cu succes
        // Aici poți face ceva, de exemplu, să redirecționezi utilizatorul către pagina de login sau să afișezi un mesaj de succes
      } else {
        // Contul nu a putut fi creat
        // Aici poți afișa un mesaj de eroare utilizatorului
      }
    } catch (error) {
      // Tratează erorile aici
    }
  }
};

const navigate=useNavigate();

  const handleLogin = () => {
    
    navigate('/login');

  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Account Type:
          <select value={accountType} onChange={handleAccountTypeChange}>
            <option value="student">Student</option>
            <option value="professor">Profesor</option>
          </select>
        </label>
        <br />
        <div class="button-container">
        <button type="button" onClick={handleCreateAccount}>
          Create Account
        </button>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        </div>
      </form>
    </div>
  );
}
export default CreateAccount;