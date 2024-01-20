import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';

function StudentDashboard() {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessorId, setSelectedProfessorId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [applications, setApplications] = useState([]);
  const [thesisTitle, setThesisTitle] = useState("");
  const location = useLocation();
  const { student } = location.state || {};
  console.log(student?.id);

  const { studentId } = useParams();
  useEffect(() => {
    // Încărcarea profesorilor
    const fetchProfessors = async () => {
      try {
        const response = await fetch("/api/professors");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfessors(data);
        } else {
          throw new Error("Failed to fetch professors");
        }
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, []);

  useEffect(() => {
    // Încărcarea sesiunilor pentru profesorul selectat
    const fetchSessions = async () => {
      if (selectedProfessorId) {
        try {
          const response = await fetch(`/api/sessions/`);
          if (response.ok) {
            const data = await response.json();
            const filteredSessions = data.filter(
              (session) => session.professorId === selectedProfessorId
            );
            setSessions(filteredSessions);
          } else {
            throw new Error("Failed to fetch sessions");
          }
        } catch (error) {
          console.error("Error fetching sessions:", error);
        }
      }
    };

    fetchSessions();
  }, [selectedProfessorId]);

  const handleSubmit = async (event) => {

    const response = await fetch("/api/sessions");

    const data = await response.json();
    const selectedSession = sessions.find((session) => session.id === selectedSessionId);
    const begin = selectedSession?.begin;
    const end = selectedSession?.end;


    event.preventDefault();
    const applicationData = {
      studentId: studentId,
      begin: begin,
        end: end,
      tema: thesisTitle,
    };
    console.log(applicationData);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(applicationData),
      });
      if (response.ok) {
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };
  useEffect(() => {
    const fetchApplications = async () => {
      if (studentId) {
        try {
          const response = await fetch(`/api/applications`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setApplications(data);
          } else {
            throw new Error("Failed to fetch applications");
          }
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
    };
  
    fetchApplications();
  }, [studentId]);
  return (
    <div>
      <h2>Student Dashboard</h2>
      <div>
    {/* ... restul codului componentei */}
    <div>
  <h3>Submitted Applications</h3>
  {applications.length > 0 ? (
    <ul>
      {applications.map((app, index) => (
        <li key={index}>
          {`Thesis Title: ${app.tema}`}
        </li>
      ))}
    </ul>
  ) : (
    <p>No applications submitted yet.</p>
  )}
</div>
  </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="professor">Select Professor:</label>
        <select
          id="professor"
          onChange={(e) => setSelectedProfessorId(e.target.value)}>
          <option value="">Select a professor</option>
          {professors.map((professor) => (
            <option key={professor.id} value={professor.id}>
              {professor.lastName}
            </option>
          ))}
        </select>

        {selectedProfessorId && (
          <>
            <label htmlFor="session">Select Session:</label>
            <select
              id="session"
              onChange={(e) => setSelectedSessionId(e.target.value)}>
              <option value="">Select a session</option>
              {sessions.map((session) => (
                <option
                  key={session.id}
                  value={
                    session.id
                  }>{`${session.begin} - ${session.end}`}</option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="thesisTitle">Thesis Title:</label>
        <input
          type="text"
          id="thesisTitle"
          value={thesisTitle}
          onChange={(e) => setThesisTitle(e.target.value)}
          required
        />

        <button type="submit">Submit Enrollment</button>
      </form>
    </div>
  );
}

export default StudentDashboard;
