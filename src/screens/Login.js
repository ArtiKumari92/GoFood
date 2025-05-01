import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Navbar />

      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <form
          className="p-4 rounded shadow-lg"
          style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            border: '1px solid #28a745',
          }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Login to Your Account</h3>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
            <div className="form-text text-light">We'll never share your email with anyone.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-50">Login</button>
            <Link to="/signup" className="btn btn-outline-light w-45">New User?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}