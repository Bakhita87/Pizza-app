from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from sqlalchemy.orm import validates
from config import db


class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))

    pizzas = db.relationship('RestaurantPizza', backref=db.backref('restaurant'))

    def restaurant_dict(self):
        return {
           "id":self.id,
           "name": self.name,
           "address": self.address
        }