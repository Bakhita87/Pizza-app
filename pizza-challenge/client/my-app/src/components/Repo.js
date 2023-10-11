import { useState,useEffect } from "react"
import { Link, useParams } from 'react-router-dom';


export default function Repo(){
    const { id } = useParams();

    const [restaurant, setRestaurant] = useState([])
    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/restaurants`)
        .then((response)=>response.json())
        .then(setRestaurant)
      }, []) 
    return(
        <>
          <ul>
      {restaurant.map((pizzas) => (
        <li key={restaurant.id}>
          { <Link to={`/restaurant/${pizzas.id}`}>{pizzas.name}</Link> }
          {/* <p>{pizzas.name}</p> */}
        </li>
      ))}

    </ul> 
    <Link to="/restaurant_pizzas/new">Add Restaurant Pizza</Link>
    </>

    )
}