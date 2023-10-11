from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from config import db


class Pizza(db.Model):
   
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    ingredients = db.Column(db.String(255))

    restaurant = db.relationship('RestaurantPizza', backref=db.backref('pizzas'))

    def pizza_dict(self):
        return {
           "id":self.id,
           "name":self.name,
           "ingredients":self.ingredients
        }
    
   