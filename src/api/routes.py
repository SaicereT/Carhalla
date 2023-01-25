"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, Users, Posts, Fav_posts, TokenBlocklist, Images
from api.utils import generate_sitemap, APIException
import json
from datetime import datetime, timezone
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt
from firebase_admin import storage
import tempfile



api = Blueprint('api', __name__)

cripto=Bcrypt(Flask(__name__))

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
    if cripto.check_password_hash(user.password, password):
        print("Clave correcta")
        access_token=create_access_token(identity=user.id)
        refresh_token=create_refresh_token(identity=user.id)
        return jsonify({"msg": "Welcome Back!", "token":access_token,"refresh":refresh_token}), 200
    else:
    #clave no valilda
        print("clave Invalida")
        return jsonify({"msg":"Invalid Login"}), 401

@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    jti=get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    blocked_token=TokenBlocklist(jti=jti, created_at=now)
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({"msg":"Token has been blocked"}), 200
    
# Traer todos los Usuarios
@api.route('/users', methods=['GET'])
def get_user():
    user=Users.query.all()
    return list(map(lambda item: item.serialize(),user)), 200

@api.route('/signup', methods = ['POST'])
def add_user():
    body = json.loads(request.data)
    for i in body:
        if (type(body[i]) != bool):
            body[i] = body[i].strip()
            
    for i in body:
        if (body[i] == ""):
            return jsonify({"msg":"There are empty values"}), 404

    user_exists=Users.query.filter(Users.email==body["email"]).first()

    if user_exists != None:
        return jsonify({"msg":"There is already an account with this email"}), 401
    
    phone_exists = Users.query.filter(Users.telnumber==body["telnumber"]).first()

    if phone_exists != None:
        return jsonify({"msg":"There is already an account with this telephone number"}), 401
        
    new_user = Users(
        email=body["email"],
        password=cripto.generate_password_hash(body["password"]).decode('utf-8'),
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
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_Fav_post():
    user_id=get_jwt_identity()
    fav_posts=Fav_posts.query.filter(Fav_posts.user_id==user_id).all()
    return list(map(lambda item: item.serialize(),fav_posts)), 200

#agregar un favorito
@api.route('/favorites/<int:fav_id>', methods=['POST'])
@jwt_required()
def add_favorite(fav_id):
    user_id=get_jwt_identity()
    post_exists=Posts.query.filter(Posts.id==fav_id).first()
    fav_exists=Fav_posts.query.filter(Fav_posts.post_id==fav_id, Fav_posts.user_id==user_id).first()
    if post_exists is None:
        return jsonify({"msg":"Post does not exist"}), 404

    if fav_exists != None:
        return jsonify({'msg':'Favorite already exists'}), 404
    

    new_fav_post=Fav_posts(user_id = user_id, post_id= fav_id)
    db.session.add(new_fav_post)
    db.session.commit()
    db.session.refresh(new_fav_post)
    return jsonify({'msg':'Favorite Added'}), 200

#quitar un favorito
@api.route('/favorites/<int:fav_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(fav_id):
    user_id=get_jwt_identity()
    fav_exists=Fav_posts.query.filter(Fav_posts.id==fav_id).first()
    if fav_exists is None:
        return jsonify({'msg':"Favorite does not exist"}), 404

    if fav_exists.user_id==user_id:
        fav_post=Fav_posts.query.filter_by(id=fav_id).delete()
        db.session.commit()
        return jsonify({'msg':"Favorite Deleted"}), 200
    
    return jsonify({"msg":"Not authorized to delete favorite"}), 403

#traer todos los post
@api.route('/posts', methods=['GET'])
def get_posts():
    posts=Posts.query.all()
    return jsonify({"results":list(map(lambda item: item.serializeCompact(),posts))}), 200

#traer toda la info de solo una
@api.route('/posts/<int:post_param>', methods=['GET'])
def get_post_detail(post_param):
    post=Posts.query.filter(Posts.id==post_param).first()
    return jsonify({"results": post.serializeFull()}), 200

#agregar una nueva publicacion
@api.route('posts/new', methods = ['POST'])
@jwt_required()
def add_post():
    user_id=get_jwt_identity()
    body={
        "title":"",
        "make":"",
        "model":"",
        "style":"",
        "fuel":"",
        "transmission":"",
        "financing":"",
        "doors":"",
        "year":"",
        "price":"",
        "description":"",
    }
    for i in body:
        if(i=="financing"):
            body[i]=bool(request.form.get(i))
        else:
            body[i]=request.form.get(i)
            #body[i] = body[i].strip()

        if (body[i] == ""):
            return jsonify({"msg":"There are empty values"}), 404

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
        user_id=user_id
    )
    print(new_post)
    db.session.add(new_post)
    db.session.flush()

    files=request.files.getlist('postPic')
    i=1 #buscar cuantas imagenes tine el post para saber de donde van a contar las imagenes nuevas
    for file in files:
        if file.filename!="":
            extension=file.filename.split(".")[1]
            temp = tempfile.NamedTemporaryFile(delete=False)
            file.save(temp.name)
            bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
            filename="posts/"+ str(new_post.id) +"/" +str(i)+ "." + extension
            resource = bucket.blob(filename)
            resource.upload_from_filename(temp.name,content_type="image/"+extension)
            newImage=Images(resource_path=filename, description="Picture for post " + str(new_post.id))
            newImage.post_id=new_post.id
            db.session.add(newImage)
            db.session.flush()
            i=i+1
    db.session.commit()
    return jsonify({"msg":"New post uploaded"}), 200

#actualizar publicacion
@api.route('/posts/update/<int:post_param>', methods = ['PUT'])
@jwt_required()
def update_post(post_param):
    user_id=get_jwt_identity()
    body = json.loads(request.data)
    for i in body:
        if (type(body[i]) != bool):
            body[i] = body[i].strip()

    for i in body:
        if (body[i] == ""):
            return jsonify({"msg":"There are empty values"}), 404

    post_exists=Posts.query.filter(Posts.id==post_param).first()

    if post_exists != None:

        if post_exists.user_id != user_id:
            return jsonify({"msg":"Not authorized to edit post"})

        post = Posts.query.get(post_param)
        post.title= body["title"]
        post.make= body["make"]
        post.model= body["model"]
        post.style= body["style"]
        post.fuel= body["fuel"]
        post.transmission= body["transmission"]
        post.doors= body["doors"]
        post.year= body["year"]
        post.price= body["price"]
        post.description= body["description"]
        post.financing= request.json.get('financing')
        db.session.commit()
        return jsonify({'msg':'Post Updated'}), 200

    return jsonify({'msg':'Post does not exist'}), 404
    
#borrando publicacion
@api.route('/posts/delete/<int:post_param>', methods = ['DELETE'])
@jwt_required()
def delete_post(post_param):
    user_id=get_jwt_identity()
    post = Posts.query.filter(Posts.id==post_param).first()
    if post is None:
        return jsonify({'msg':'Post does not exist'}), 404

    if post.user_id != user_id:
        return jsonify({"msg":"Not authorized to delete post"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({'msg':'Post Deleted'}), 200

@api.route('/change_password', methods=['PATCH'])
@jwt_required()
def update_user_password():
    new_password=request.json.get("password")
    user_id=get_jwt_identity()
    user=Users.query.get(user_id)
    user.password=cripto.generate_password_hash(new_password).decode('utf-8')
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Password has been updated"}), 200


#@api.route ('/uploadPostImage/<int:post_param>', methods=['POST'])
#@jwt_required()
#def uploadPostImage(post_param):
#    post = Posts.query.filter(Posts.id==post_param).first()
#    user_id = get_jwt_identity()
#    user = Users.query.get(get_jwt_identity())
#    if user is None:
#        return jsonify({"msg":"User not found"}), 403
#    
 #   if post is None:
#        return jsonify({"msg":"Post not found"}), 403 
#
#    if post.user_id != user_id:
#        return jsonify({"msg":"Not authorized to delete post"}), 403
#
 #   file=request.files['postPic']
#    extension=file.filename.split(".")[1]
#    temp = tempfile.NamedTemporaryFile(delete=False)
#    file.save(temp.name)
#    bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
#    filename="posts/" + str(user_id) + "/" + str(post_param) + "." + extension
#    resource = bucket.blob(filename)
#    resource.upload_from_filename(temp.name,content_type="image/"+extension)
#
#    if Images.query.filter(Images.resource_path==filename).first() is None:
#
#        newImage=Images(resource_path=filename, description="Picture for post " + str(post_param))
#        db.session.add(newImage)
#        db.session.flush()
#        post.post_picture_id=newImage.id
#        db.session.add(user)
#        db.session.commit()
#        return jsonify({"msg":"Image uploaded"}), 200
#
#    return jsonify({"msg":"Image updated"}), 200
