import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      setFoodItems(json[0]);
      setFoodCat(json[1]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch food data:", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: 9 }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search food..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-danger" onClick={() => setSearch('')}>X</button>
              </div>
            </div>

            {/* Carousel images */}
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="food1" />
            </div>
            <div className="carousel-item">
              <img src="https://images5.alphacoders.com/101/1017761.jpg?auto=format&fit=crop&w=900&q=80" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="food2" />
            </div>
            <div className="carousel-item">
              <img src="https://c4.wallpaperflare.com/wallpaper/812/634/385/food-lemons-barbeque-vegetables-wallpaper-preview.jpg" className="d-block w-100" style={{ filter: "brightness(90%)" }} alt="food3" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Food Listing */}
      <div className='container py-4' style={{ backgroundColor: '#f8f9fa' }}>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading food items...</p>
          </div>
        ) : (
          Array.isArray(foodCat) && foodCat.length > 0 &&
          foodCat.map((category) => (
            <div className='row mb-4' key={category._id}>
              <div className='fs-4 text-success mb-2 fw-bold'>
                {category.CategoryName}
              </div>
              <hr style={{ height: "3px", backgroundImage: "linear-gradient(to right, #28a745, #000000)" }} />
              {
                Array.isArray(foodItems) && foodItems.length > 0
                  ? foodItems
                    .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map(item => (
                      <div key={item._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                        <Card foodName={item.name} item={item} options={item.options[0]} ImgSrc={item.img} />
                      </div>
                    ))
                  : <div className="text-muted">No items available</div>
              }
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}