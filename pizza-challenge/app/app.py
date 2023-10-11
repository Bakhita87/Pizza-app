from flask import Flask,request,jsonify
from flask import jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from pizza import Pizza
from restaurant import Restaurant
from restaurantpizza import RestaurantPizza
from config import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app=app)

@app.route('/')
def home():
    return "Welcome to the API"


@app.route('/restaurants', methods=['GET'])
def getRestaurants():
    all_restaurant= Restaurant.query.all()
    restaurant_list=[
        {
            "id":restaurants.id,
            "name":restaurants.name,
            "address":restaurants.address
        }
        for restaurants in all_restaurant
    ]
    return jsonify(restaurant_list)


@app.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant_by_Id(id):
    restaurant = Restaurant.query.get(id)
    if restaurant is None:
        return jsonify({"error": "Restaurant not found"}), 404
    for pizza in restaurant.pizzas:
     pizza1 = Pizza.query.get(pizza.pizza_id)
     if pizza:
      restaurant_pizza_list=[
        {
           "id":pizza1.id,
           "name":pizza1.name,
           "ingredients":pizza1.ingredients
        }
       
      ]
     else:
         restaurant_pizza_list=[{
             "error":"No Pizza"
         }]
    restaurant_data={
        "id":restaurant.id,
        "name":restaurant.name,
        "address":restaurant.address,
        "pizza":restaurant_pizza_list
    }
    return jsonify(restaurant_data)


@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant =Restaurant.query.filter_by(id= id).first()
    if restaurant is None:
        return jsonify({"error": "Restaurant not found"}), 404
    
    # Delete associated RestaurantPizza records
    db.session.delete(restaurant)
    db.session.commit()
    
    return '', 204  


@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    pizza_list=[
       { 
        "id":pizza.id,
        "name":pizza.name,
        "ingredients": pizza.ingredients
       }
       for pizza in pizzas
    ]
    return jsonify(pizza_list)

@app.route('/pizzas_add', methods=['POST'])
def create_pizza():
    try:
        data = request.get_json()
        name = data.get('name')
        ingredients = data.get('ingredients')

        if not name or not ingredients:
            return jsonify({'errors': "No Pizza data found"}), 422
        
        # Create a new pizza
        pizza = Pizza(name=name, ingredients=ingredients)
        db.session.add(pizza)
        db.session.commit()

        # Return the created pizza data
        pizza_data = {
            'id': pizza.id,
            'name': pizza.name,
            'ingredients': pizza.ingredients
        }
        return jsonify(pizza_data), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': [str(e)]}), 400


@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurantPizza():
    try:
        data = request.get_json()
        price = data.get('price')
        pizza_id = data.get('pizza_id')
        restaurant_id = data.get('restaurant_id')

        if not price or not pizza_id or not restaurant_id:
            return jsonify({'errors': "No RestaurantPizza"}), 422
        restaurant = Restaurant.query.get(restaurant_id)
        pizza = Pizza.query.get(pizza_id)
        if restaurant and pizza:
            restaurantPizza = RestaurantPizza(price=price, restaurant_id=restaurant.id, pizza_id=pizza.id)
            db.session.add(restaurantPizza)
            db.session.commit()
            pizza_data ={
                'id': pizza.id,
                'name': pizza.name,
                'ingredients': pizza.ingredients
            }
            return jsonify(pizza_data)
    except Exception as e:
        db.session.rollback()
        return jsonify({'errors': [str(e)]}), 400

if __name__ == '__main__':
    app.run(port=5555)
