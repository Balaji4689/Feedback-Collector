import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    feedback: '',
  });
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('https://feedback-collector-feedbak-sever.onrender.com/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: formData.userName,
          email: formData.email,
          feedback: formData.feedback,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFormData({
          userName: '',
          email: '',
          feedback: '',
        });
      } else {
        alert(data.error || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('https://feedback-collector-feedbak-sever.onrender.com/api/feedback/all');
      const data = await response.json();
      if (response.ok) {
        setFeedbacks(data);
      } else {
        console.error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showFeedbacks) fetchFeedbacks();
  }, [showFeedbacks]);

  return (
    <div className="container">
      <div className="form-Container">
        <h1>Feedback Collector</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="userName" placeholder="User Name" value={formData.userName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <textarea name="feedback" placeholder="Send your Feedback" value={formData.feedback} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>

      <button
        onClick={() => setShowFeedbacks(!showFeedbacks)}
        className="feedback-toggle-btn">
        {showFeedbacks ? 'Hide Feedbacks' : 'Show Feedbacks'}
      </button>

      {showFeedbacks && (
        <div className="feedback-list">
          {feedbacks.map((f, index) => (
            <div key={index} className="feedback-item">
              <p><strong>{f.UserName}</strong> ({f.email})</p>
              <p>{f.feedback}</p>
            </div>
          ))}
        </div>
      )}
      <footer className="footer">
        <p className="footer-text">
          Feedback Collector App | Created by <span className="name">Maddula Balaji Reddy</span> - Submission Info
        </p>
      </footer>
    </div>
  );
};

export default App;
