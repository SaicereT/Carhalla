"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, Users, Posts, Fav_posts
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

# Traer todos los Usuarios
@api.route('/users', methods=['GET'])
def get_user():
    user=Users.query.all()
    return list(map(lambda item: item.serialize(),user)), 200
   
# traer los favoritos
@api.route('/users/<int:user_param>/favorites', methods=['GET'])
def get_Fav_post(user_param):
    fav_posts=Fav_posts.query.filter(Fav_posts.user_id==user_param).all()
    return list(map(lambda item: item.serialize(),fav_posts)), 200

#agregar un favorito
@api.route('/users/<int:user_param>/favorites/<int:fav_id>', methods=['POST'])
def add_favorite(user_param, fav_id):
    fav_exists=Fav_posts.query.filter(Fav_posts.post_id==fav_id, Fav_posts.user_id==user_param).first()
    if fav_exists != None:
        return jsonify('Favorite already exists'), 404
    
    new_fav_post=Fav_posts(user_id = user_param, post_id= fav_id)
    db.session.add(new_fav_post)
    db.session.commit()
    db.session.refresh(new_fav_post)
    return jsonify("Favorite Added"), 200

#quitar un favorito
@api.route('/favorites/<int:fav_id>', methods=['DELETE'])
def delete_favorite(fav_id):
    fav_exists=Fav_posts.query.filter(Fav_posts.id==fav_id).first()
    if fav_exists is None:
        return jsonify("Favorite does not exist"), 404

    fav_post=Fav_posts.query.filter_by(id=fav_id).delete()
    db.session.commit()
    return jsonify("Favorite Deleted"), 200

#traer todos los post
@api.route('/posts', methods=['GET'])
def get_posts():
    posts=Posts.query.all()
    return list(map(lambda item: item.serializeCompact(),posts)), 200

#traer toda la info de solo una
@api.route('/posts/<int:post_param>', methods=['GET'])
def get_post_detail(post_param):
    post=Posts.query.filter(Posts.id==post_param).first()
    return jsonify(post.serializeFull()), 200


