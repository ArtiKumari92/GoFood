import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const cartData = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();

  const { options, item: foodItem, foodName, ImgSrc } = props;
  const priceOptions = Object.keys(options);
  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQtyChange = (e) => setQty(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleAddToCart = async () => {
    let existingItem = cartData.find(item => item.id === foodItem._id);

    if (existingItem && Object.keys(existingItem).length !== 0) {
      if (existingItem.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty,
          size,
          img: ImgSrc
        });
        console.log("Size different, added as new item");
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty,
      size,
      img: ImgSrc
    });
  };

  return (
    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
      <img src={ImgSrc} className="card-img-top" alt="Food" style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
        <h5 className="card-title">{foodName}</h5>
        <div className="container w-100 p-0" style={{ height: "38px" }}>
          <select className="m-2 h-100 w-20 bg-success text-black rounded"
            onClick={handleClick}
            onChange={handleQtyChange}>
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select className="m-2 h-100 w-20 bg-success text-black rounded"
            ref={priceRef}
            onClick={handleClick}
            onChange={handleSizeChange}>
            {priceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <div className='d-inline ms-2 h-100 w-20 fs-5'>
            ₹{finalPrice}/-
          </div>
        </div>

        <hr />
        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}