import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function RestaurantPizza() {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  
    fetch("http://127.0.0.1:5555/restaurants")
      .then((r) => r.json())
      .then((data) => setRestaurants(data));

  
    fetch("http://127.0.0.1:5555/pizzas")
      .then((r) => r.json())
      .then((data) => setPizzas(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      pizza_id: pizzaId,
      restaurant_id: restaurantId,
      price: parseInt(price),
    };
    fetch("http://127.0.0.1:5555/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (!r.ok) {
        
        throw new Error("Failed to add Restaurant pizza");
      }
      return r.json();
    })
    .then((data) => {
    
      navigate(`/restaurant/${restaurantId}`);
    })
    .catch((error) => {
     
      setFormErrors([error.message]); console.log(formData)
    });
}
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pizza_id">Pizza:</label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a pizza of your choice</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="restaurant_id">Restaurant:</label>
      <select
        id="restaurant_id"
        name="restaurant_id"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      >
        <option value="">Choose a restaurant</option>
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <label htmlFor="price">Price :</label>
      <input
        type="text"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      
      <button type="submit">Add Restaurant Pizza</button>
    </form>
  );
}

export default RestaurantPizza;