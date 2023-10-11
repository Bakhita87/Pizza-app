// components/RestaurantList.js
import  { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


function RestaurantList() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [restsss, setRest] = useState([])

  const { id } = useParams();

  useEffect(()=>{
    fetch(`http://127.0.0.1:5555/restaurants`)
    .then((response)=>response.json())
    .then(setRest)
  }, [])

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/restaurants`).then((r) => {
      if (r.ok) {
        r.json().then((hero) =>
     
          setRestaurant({ data: hero, error: null, status: "resolved" }),
          console.log(restaurant)
        );
      } else {
        r.json().then((err) =>
          setRestaurant({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;


  return (
    <section>
    <h2>{restsss.id}</h2>
    <h2>Hello World</h2>

    <h3>Pizza:</h3>
    {/* <ul>
      {restaurant.pizzas.map((pizzas) => (
        <li key={restaurant.id}>
          <Link to={`/pizzas/${pizzas.id}`}>{pizzas.name}</Link>
        </li>
      ))}
    </ul> */}

    <Link to="/restaurant_pizzas/new">Add Restaurant Pizza</Link>
  </section>
  );
}

export default RestaurantList;
