import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from pizza import  Pizza
from config import db
from app import app
from restaurantpizza import RestaurantPizza
from restaurant import Restaurant


# import random

with app.app_context():

 print("🦸‍♀️ Seeding restaurant...")
 restaurant_data = [
    {"name": "Slate", "address": "Westlands"},
    {"name": "Sierra", "address": "Argwings Kodhek"},
    {"name": "Kilimani Bistro", "address": "Kilimani Road"},
    {"name": "Amazon Lounge", "address": "Menelik Road"}
 ]

 for restaurant_info in restaurant_data:
     restaurant = Restaurant(**restaurant_info)
     db.session.add(restaurant)

  
 print("🦸‍♀️ Seeding Pizza...")
 pizza_data = [
    {"name": "A", "ingredients": "ketchup"},
    {"name": "B", "ingredients": "oil"},
    {"name": "C", "ingredients": "flour"},
    {"name": "D", "ingredients": "Cheese"},
    {"name": "E", "ingredients": "beef"},
    {"name": "F", "ingredients": "pepperoni"},
    {"name": "G", "ingredients": "Chicken"},
    {"name": "I", "ingredients": "Ham"}
 ]

 for pizza_info in pizza_data:
    pizza = Pizza(**pizza_info)
    db.session.add(pizza)


 print("🦸‍♀️ Adding a Restaurant...")
 restaurants = Restaurant.query.all()
 pizzas= Pizza.query.all()

 price=[20,10,2,7,5,9,6]
 for restaurant in restaurants:
    for i in price:
        restaurant = Restaurant.query.order_by(db.func.random()).first()
        pizza =Pizza.query.order_by(db.func.random()).first()
        restaurant_piza = RestaurantPizza(restaurant_id=restaurant.id, pizza_id=pizza.id, price=i)
        db.session.add(restaurant_piza)

 try:
    db.session.commit()
    print("🦸‍♀️ Seeding successful!")
 except Exception as e:
    db.session.rollback()
    print("error:", str(e))