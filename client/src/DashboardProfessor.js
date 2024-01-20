import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProfessorDashboard.css';

function ProfessorDashboard() {
    const [showCreateSessionForm, setShowCreateSessionForm] = useState(false);
    const [sessions, setSessions] = useState([]);
    const location = useLocation();
    const {professor}=location.state || {};
    console.log(professor?.id);

    useEffect(() => {
      const fetchSessions = async () => {
        try {
          const response = await fetch('/api/sessions');
          if (response.ok) {
            const data = await response.json();
            setSessions(data);
          } else {
            throw new Error('Failed to fetch sessions');
          }
        } catch (error) {
          console.error('Error fetching sessions:', error);
        }
      };
  
      fetchSessions();
    }, []);
  
    const createSession = async (sessionData) => {
      try {
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sessionData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to create session');
        }
  
        if (response.ok) {
          window.location.reload(); // O altă opțiune ar fi să actualizați state-ul în loc să reîncărcați pagina
        }
  
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleCreateSession = (event) => {
      console.log(professor?.id);  
      event.preventDefault();
      const sessionData = {
        begin: event.target.begin.value,
        end: event.target.end.value,
        locuri: event.target.locuri.value,
        professorId: professor?.id
      };
      createSession(sessionData);
    };
    const deleteSession = async (sessionId) => {
        try {
          const response = await fetch(`/api/sessions/${sessionId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const updatedSessions = sessions.filter(session => session.id !== sessionId);
            setSessions(updatedSessions);
      } else {
      throw new Error('Failed to delete the session');
      }
      } catch (error) {
      console.error('Error deleting session:', error);
      }
      };
    return (
      <div className="container">
        <h2 className="header">{professor?.firstName} {professor?.lastName}'s Dashboard</h2>
        <button className="button" onClick={() => setShowCreateSessionForm(true)}>Create New Session</button>
  
        {showCreateSessionForm && (
          <form onSubmit={handleCreateSession}>
            <label htmlFor="begin">Start Date:</label>
            <input type="date" id="begin" name="begin" required />
  
            <label htmlFor="end">End Date:</label>
            <input type="date" id="end" name="end" required />
  
            <label htmlFor="locuri">Number of Places:</label>
            <input type="number" id="locuri" name="locuri" required />
  
            <button type="submit">Submit</button>
          </form>
        )}
  
        <h3>Existing Sessions</h3>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Start Date</th>
              <th className='th'>End Date</th>
              <th className='th'>Number of Places</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td className='th'>{session.begin}</td>
                <td className='th'>{session.end}</td>
                <td className='th'>{session.locuri}</td>
                <td className='td'>
                <button onClick={() => deleteSession(session.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default ProfessorDashboard;