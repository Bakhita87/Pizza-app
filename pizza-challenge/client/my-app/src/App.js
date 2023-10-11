
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantPizza from './components/RestaurantPizza';
import RestaurantList from './components/RestaurantList';
import RestaurantData from './components/RestaurantData';
import Pizza from './components/Pizza';
import Repo from './components/Repo';



function App() {
  return (
    // <div className="App">
      
    //   <RestaurantPizza/>
      
         
    // </div>
    <Router >
      <Routes>
        <Route path='/' element= {<Pizza/>}/>
      
        <Route path='/restaurants' element= {<Repo/>}/>
        <Route path='/restaurant/:id' element= {<RestaurantData/>}/>
        <Route path='/restaurant_pizzas/new' element= {<RestaurantPizza/>}/>

      </Routes>
    </Router>
  );
}

export default App;
