import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const foodItem = props.item;

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

  const finalPrice = qty * parseInt(options[size] || 0);

  const handleAddToCart = async () => {
    const existingItem = data.find(item => item.id === foodItem._id && item.size === size);

    if (existingItem) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc
      });
    }
  };

  return (
    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
      <img
        src={props.ImgSrc}
        className="card-img-top"
        alt={props.foodName}
        style={{ height: "120px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
        <div className="container w-100 p-0 d-flex align-items-center justify-content-between">
          <select className="m-2 h-100 w-25 bg-success text-white rounded" onChange={handleQty} onClick={handleClick}>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select className="m-2 h-100 w-50 bg-success text-white rounded" ref={priceRef} onChange={handleOptions} onClick={handleClick}>
            {priceOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>

          <div className="fs-6 fw-semibold ms-2">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button className="btn btn-success w-100 mt-2" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
