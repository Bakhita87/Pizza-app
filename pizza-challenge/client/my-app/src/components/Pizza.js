import React from  "react";
import { useNavigate} from "react-router-dom"




export default function Pizza(){
    const navigate=useNavigate()
    const gotoDetail=()=>{
        navigate("/restaurants/:id")
      }
      const gotoList=()=>{
        navigate("/restaurants")
      }
      const gotoPizza=()=>{
        navigate("/")
      } 
    return(
        <>
        <div className="data">
        
            <header>Welcome to RestaurantPizza</header>
            <button onClick={gotoPizza} className="nav-link " aria-disabled="true">Pizza</button>
            {/* <button onClick={gotoDetail} className="nav-link " aria-disabled="true">RestaurantDetail</button> */}
            <button onClick={gotoList} className="nav-link " aria-disabled="true">RestaurantList</button>
           

      
        </div>
        </>
    )
}