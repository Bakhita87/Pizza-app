import React, { useEffect, useState } from 'react';
import { useNavigate , useParams} from "react-router-dom"


const navigate=useNavigate
const gotoDetail=()=>{
    navigate("http://127.0.0.1:5555/restaurants/:id")
  }

function RestaurantData({ match }) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    
    fetch(`http://127.0.0.1:5555/restaurants/${id}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error('Restaurant not found');
        }
        return response.json();
      })
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const handleDeleteRestaurant = () => {
   
    fetch(`http://127.0.0.1:5555/restaurants/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          setDeleted(true);
        } else {
          throw new Error('Failed to delete restaurant');
        }
      })
      .catch((error) => console.error('Error deleting restaurant:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (deleted) {
    return <div>Restaurant deleted successfully!</div>;
  }

  if (!restaurant) {
    return <div>Restaurant does not exist</div>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Address: {restaurant.address}</p>
      <button onClick={handleDeleteRestaurant}>Delete Restaurant</button>
      {/* <button onClick={gotoDetail} className="nav-link " aria-disabled="true">RestaurantDetail</button> */}
    </div>
  );
}

export default RestaurantData;