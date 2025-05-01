import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };

    try {
      const res = await navLocation();
      const lat = res.coords.latitude;
      const long = res.coords.longitude;

      const response = await fetch("http://localhost:5000/api/auth/getlocation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latlong: { lat, long } })
      });

      const data = await response.json();
      console.log("Location received:", data.location);

      setAddress(data.location);
      setCredentials(prev => ({ ...prev, geolocation: data.location }));
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/login");
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
        backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <div className='container d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
        <form
          className='p-4 rounded shadow-lg text-light'
          style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid #28a745',
          }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Create Your Account</h3>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" name='address' placeholder='Click below to fetch location' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="mb-3 d-grid">
            <button type="button" onClick={handleClick} className="btn btn-outline-light">
              📍 Click for Current Location
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success w-50">Sign Up</button>
            <Link to="/login" className="btn btn-outline-warning w-45">Already a user?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
