from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from config import db

class RestaurantPizza(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float)
    pizza_id = db.Column(db.Integer, db.ForeignKey("pizza.id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurant.id"))

    
    
@validates('price')
def validate_price(self, key, value):
    if not (1 < value <=30):
        raise ValueError('{} is an invalid price'.format(value))
    return value