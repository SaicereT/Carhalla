"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, Users, Posts, Fav_posts
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
# Traer todos los Usuarios
@api.route('/user', methods=['GET'])
def get_user():
    user=Users.query.all()
    return list(map(lambda item: item.serialize(),user)), 200
    
# traer los favoritos
@api.route('/fav_posts', methods=['GET'])
def get_Fav_post():
    fav_posts=Fav_posts.query.all()
    return list(map(lambda item: item.serialize(),fav_posts)), 200

@api.route('/posts', methods=['GET'])
def get_posts():
    posts=Posts.query.all()
    return list(map(lambda item: item.serialize(),Posts)), 200

    
    