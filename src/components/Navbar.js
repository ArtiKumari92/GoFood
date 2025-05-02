import React from 'react' // Removed unused useState
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" to="/">Home</Link>
              </li>
              {localStorage.getItem("token") &&
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" to="/myorder">My Orders</Link>
                </li>}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
              </form>
            ) : (
              <div>
                {/* Cart code can go here later */}
                <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
