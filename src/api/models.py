from flask_sqlalchemy import SQLAlchemy
from firebase_admin import storage
import datetime

db = SQLAlchemy()

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

class Users(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(1000), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=True)
    firstname = db.Column(db.String(40), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    telnumber = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(120), unique=False, nullable=False)
    age = db.Column(db.String(120), unique=False, nullable=False)
    bio = db.Column(db.String(1000), unique=False, nullable=True)
    profile_picture_id=db.Column(db.Integer, db.ForeignKey("profilepics.id"))
    profile_picture=db.relationship("ProfilePics")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "firstname":self.firstname,
            "is_active":self.is_active,
            "lastname":self.lastname,
            "telnumber":self.telnumber,
            "address":self.address,
            "country":self.country,
            "age":self.age,
            "profile_pic":self.profile_picture.image_url(),
            "bio":self.bio,
        }
    def serializePub(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active":self.is_active,
            "telnumber":self.telnumber,
            "profile_pic":self.profile_picture.image_url(),
            "bio":self.bio,
        }

class Posts(db.Model):
    __tablename__="posts"
    id = db.Column(db.Integer, primary_key=True)
    premium = db.Column(db.Boolean(), unique=False, nullable=True)
    title = db.Column(db.String(240), unique=False, nullable=False)
    make = db.Column(db.String(120), unique=False, nullable=False)
    model = db.Column(db.String(200), unique=False, nullable=False)
    style = db.Column(db.String(200), unique=False, nullable=False)
    fuel = db.Column(db.String(120), unique=False, nullable=False)
    transmission = db.Column(db.String(120), unique=False, nullable=False)
    financing = db.Column(db.Boolean(), unique=False, nullable=False)
    doors = db.Column(db.Integer, unique=False, nullable=False)
    year = db.Column(db.Integer, unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    miles = db.Column(db.Integer, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship(Users)

    def __repr__(self):
        return f'<Post: {self.id}>'
    
    def serializeCompact(self):
        imagelist= list(map(lambda item: item.image_url(),self.images))
        return {
        "title":self.title,
        "username":self.user.username,
        "year":self.year,
        "make":self.make,
        "model":self.model,
        "price":self.price,
        "post_id":self.id,
        "premium":self.premium,
        "miles":self.miles,
        "doors":self.doors,
        "fuel":self.fuel,
        "transmission":self.transmission,
        "style":self.style,
        "telnumber":self.user.telnumber,
        "images": imagelist,
        }
    
    def serializeFull(self):
        imagelist= list(map(lambda item: item.image_url(),self.images))
        return {
        "post_id":self.id,
        "title":self.title,
        "make":self.make,
        "model":self.model,
        "style":self.style,
        "fuel":self.fuel,
        "transmission":self.transmission,
        "financing":self.financing,
        "doors":self.doors,
        "year":self.year,
        "price":self.price,
        "description":self.description,
        "user_id":self.user_id,
        "username":self.user.username,
        "miles":self.miles,
        "premium":self.premium,
        "telnumber":self.user.telnumber,
        "images": imagelist,
        }

class Fav_posts(db.Model):
    __tablename__= "Fav_posts"
    id = db.Column(db.Integer, primary_key=True)
    post_id=db.Column(db.Integer, db.ForeignKey("posts.id"))
    post=db.relationship(Posts)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    user=db.relationship(Users)

    def __repr__(self):
        return '<Fav_posts %r>' %self.id

    def serialize(self):
        imagelist= list(map(lambda item: item.image_url(),self.post.images))
        return {
            "id":self.id,
            "post_id":self.post.id,
            "title":self.post.title,
            "user_id":self.user_id,
            "model":self.post.model,
            "year":self.post.year,
            "price":self.post.price,
            "premium":self.post.premium,
            "images": imagelist,
        }

class Images(db.Model):
    __tablename__= "images"
    id = db.Column(db.Integer, primary_key=True)
    resource_path=db.Column(db.String(250), unique=False, nullable=False)
    imageposition=(db.Column(db.Integer, nullable=True))
    description=db.Column(db.String(200))
    post_id=db.Column(db.Integer, db.ForeignKey("posts.id"))
    post=db.relationship(Posts, backref="images")

    def serialize(self):
        return {
            "id":self.id,
            "resurse_path": self.resource_path,
            "description": self.description
        }

    def image_url(self):
        bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
        resource=bucket.blob(self.resource_path)
        signed_url=resource.generate_signed_url(version="v4", expiration=datetime.timedelta(minutes=15), method="GET")
        return {
            "id":self.id,
            "resource_path": self.resource_path,
            "signed_url": signed_url,
            "imageposition":self.imageposition
        }
    

class ProfilePics(db.Model):
    __tablename__="profilepics"
    id = db.Column(db.Integer, primary_key=True)
    resource_path=db.Column(db.String(250), unique=True, nullable=False)
    description=db.Column(db.String(200))

    def serialize(self):
        return {
            "id":self.id,
            "resource_path": self.resource_path,
            "description": self.description
        }

    def image_url(self):
        bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
        resource=bucket.blob(self.resource_path)
        signed_url=resource.generate_signed_url(version="v4", expiration=datetime.timedelta(minutes=15), method="GET")
        return {
            "id":self.id,
            "resource_path": self.resource_path,
            "signed_url": signed_url
        }
