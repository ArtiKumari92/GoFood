import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  localStorage.setItem('temp', "first");
  const navigate = useNavigate();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          filter: 'blur(20)',
          position: "fixed",
          zIndex: "10",
          width: "100%"
        }}>
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
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
              </form>
            ) : (
              <div className="d-flex align-items-center">
                <div className="btn btn-light text-dark mx-2 d-flex align-items-center" onClick={loadCart}>
                  <ShoppingCartIcon />
                  <span className="ms-2">Cart</span>
                  {items.length > 0 && (
                    <Badge bg="danger" pill className="ms-2">{items.length}</Badge>
                  )}
                </div>
                <button onClick={handleLogout} className="btn bg-white text-success mx-2">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
    </div>
  );
}