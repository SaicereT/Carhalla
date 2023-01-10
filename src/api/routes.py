"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, Users, Posts, Fav_posts 
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token, create_refresh_token



api = Blueprint('api', __name__)

#inicio de session 
@api.route('/login', methods=['POST'])
def user_login():
    email=request.json.get('email')
    password=request.json.get('password')
    user= Users.query.filter(Users.email==email).first()
 #valida si el Usuario
    if user==None:
        print("correo invalido")
        return jsonify({"msg":"Invalid Login"}), 401
 #valida la contraseña
    if user.password==password:
        print("Clave correcta")
        access_token=create_access_token(identity=user.id)
        refresh_token=create_refresh_token(identity=user.id)
        return jsonify({"msg": "Welcome Back!", "token":access_token,"refresh":refresh_token}), 200
    else:
    #clave no valilda
        print("clave Invalida")
        return jsonify({"msg":"Invalid Login"}), 401
    
# Traer todos los Usuarios
@api.route('/users', methods=['GET'])
def get_user():
    user=Users.query.all()
    return list(map(lambda item: item.serialize(),user)), 200

@api.route('users/new', methods = ['POST'])
def add_user():
    body = json.loads(request.data)
    user_exists=Users.query.filter(Users.email==body["email"]).first()
    if user_exists != None:
        return jsonify({"msg":"There is already an account with this email"}), 401
#    for i in body:
#       test = lambda: [i.strip() for i in body]
#        if (not (body[i] and (body[i]).strip())):
#            return jsonify({"msg":"There are empty values"}), 404        
    new_user = Users(
        email=body["email"],
        password=body["password"],
        is_active=body["is_active"],
        firstname=body["firstname"],
        lastname=body["lastname"],
        telnumber=body["telnumber"],
        address=body["address"],
        country=body["country"],
        age=body["age"]
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"New user created!"}), 200
   
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
        return jsonify({'msg':'Favorite already exists'}), 404
    
    new_fav_post=Fav_posts(user_id = user_param, post_id= fav_id)
    db.session.add(new_fav_post)
    db.session.commit()
    db.session.refresh(new_fav_post)
    return jsonify({'msg':'Favorite Added'}), 200

#quitar un favorito
@api.route('/favorites/<int:fav_id>', methods=['DELETE'])
def delete_favorite(fav_id):
    fav_exists=Fav_posts.query.filter(Fav_posts.id==fav_id).first()
    if fav_exists is None:
        return jsonify({'msg':"Favorite does not exist"}), 404

    fav_post=Fav_posts.query.filter_by(id=fav_id).delete()
    db.session.commit()
    return jsonify({'msg':"Favorite Deleted"}), 200

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

#agregar una nueva publicacion
@api.route('posts/new', methods = ['POST'])
def add_post():
    body = json.loads(request.data)
    for i in body:
        if body[i] is None:
            raise APIException("There are empty values", status_code=404)
    
    new_post = Posts(
        title=body["title"],
        make=body["make"],
        model=body["model"],
        style=body["style"],
        fuel=body["fuel"],
        transmission=body["transmission"],
        financing=body["financing"],
        doors=body["doors"],
        year=body["year"],
        price=body["price"],
        description=body["description"],
        user_id=body["user_id"]
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"msg":"New post uploaded"}), 200
    
#borrando publicacion
@api.route('/posts/delete/<int:post_param>', methods = ['DELETE'])
def delete_post(post_param):
    post = Posts.query.filter(Posts.id==post_param).first()
    if post != None:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'msg':'Post Deleted'}), 200
    return jsonify({'msg':'Post does not exist'}), 404



