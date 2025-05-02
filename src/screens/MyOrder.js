import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            const data = await response.json();
            if (data.orderData && Array.isArray(data.orderData.order_data)) {
                setOrderData(data.orderData.order_data);
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            setOrderData([]);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.slice(0).reverse().map((orderGroup, groupIndex) => {
                            const orderDateObj = orderGroup[0];
                            const orderDate = orderDateObj?.Order_date;

                            const items = orderGroup.slice(1); // remaining objects are actual items

                            return (
                                <React.Fragment key={groupIndex}>
                                    <div className='m-auto mt-5'>
                                        <strong>Order Date:</strong> {orderDate}
                                        <hr />
                                    </div>
                                    {items.map((item, itemIndex) => (
                                        <div
                                            className='col-12 col-md-6 col-lg-3'
                                            key={itemIndex}
                                        >
                                            <div
                                                className='card mt-3'
                                                style={{
                                                    width: '16rem',
                                                    maxHeight: '360px',
                                                }}
                                            >
                                                <img
                                                    src={item.img}
                                                    className='card-img-top'
                                                    alt={item.name}
                                                    style={{
                                                        height: '120px',
                                                        objectFit: 'fill',
                                                    }}
                                                />
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{item.name}</h5>
                                                    <div
                                                        className='container w-100 p-0'
                                                        style={{ height: '38px' }}
                                                    >
                                                        <span className='m-1'>Qty: {item.qty}</span>
                                                        <span className='m-1'>Size: {item.size}</span>
                                                        <span className='m-1'>₹{item.price}/-</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <div className='text-center mt-5'>
                            <h5>No orders found.</h5>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
