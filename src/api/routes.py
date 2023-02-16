"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, jsonify
from api.models import db, Users, Posts, Fav_posts, TokenBlocklist, Images, ProfilePics
from api.utils import generate_sitemap, APIException
import json
from datetime import datetime, timezone, timedelta
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity
from flask_bcrypt import Bcrypt
from firebase_admin import storage
from .sendemail import mail_recovery_template, send_mail
import tempfile
from sqlalchemy import func




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
    
#info de un usuario
@api.route('/user_info', methods=['GET'])
@jwt_required()
def get_user_info():
    user_id=get_jwt_identity()
    if user_id:
        user=Users.query.filter(Users.id==user_id).first()
        return jsonify({"results": user.serialize()}), 200
    return jsonify({"msg":"No User Found"})

#actualizar publicacion
@api.route('/user_info/update', methods = ['PUT'])
@jwt_required()
def update_user_info():
    user_id=get_jwt_identity()
    body = json.loads(request.data)
    for key in body:
        if (type(body[key]) != bool):
            body[key] = body[key].strip()

    user = Users.query.get(user_id)
    for key in body:
        if (body[key] != ""):
            for col in user.serialize():
                if key == col and key != "id":
                    setattr(user, col, body[key])
    db.session.commit()
    return jsonify({'msg':'User Updated'}), 200

@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_info_pub(user_id):
    user=Users.query.filter(Users.id==user_id).first()
    if user:
        return jsonify({"results": user.serializePub()}), 200
    return jsonify({"msg":"No User Found"})
    

#Traer las publicaciones de un usuario
@api.route('/user_posts', methods=['GET'])
@jwt_required()
def get_user_posts():
    user_id=get_jwt_identity()
    if user_id:
        user_posts=Posts.query.filter(Posts.user_id==user_id).all()
        if user_posts is None:
            return jsonify({"msg":"No posts found"}), 404
        return jsonify({"results":list(map(lambda item: item.serializeCompact(),user_posts))}), 200
    return jsonify({"msg":"Unauthorized request"}), 401

@api.route('/user_posts/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_posts_pub(user_id):
    user_posts=Posts.query.filter(Posts.user_id==user_id).all()
    if user_posts is None:
        return jsonify({"msg":"No posts found"}), 404
    return jsonify({"results":list(map(lambda item: item.serializeCompact(),user_posts))}), 200


#Crear una cuenta
@api.route('/signup', methods = ['POST'])
def add_user():
    body = {
        "email":"",
        "username":"",
        "password":"",
        "firstname":"",
        "lastname":"",
        "telnumber":"",
        "address":"",
        "country":"",
        "age":""
    }
    for key in body:
        body[key]=request.form.get(key)
        print(body)
        if (body[key] == "" or body[key] is None):
            return jsonify({"msg":"There are empty values"}), 401
        body[key] = body[key].strip()     

    #user_exists=Users.query.filter(Or(Users.email==body["email"], Users.telnumber==body["telnumber"])).first
    #phone_exists = Users.query.filter(Users.telnumber==body["telnumber"]).first

    #if user_exists != None:
    #    return jsonify({"msg":"There is already an account with this email"}), 401
    
    #if phone_exists != None:
    #   return jsonify({"msg":"There is already an account with this telephone number"}), 401

    new_user = Users(
        email=body["email"],
        username=body["username"],
        password=cripto.generate_password_hash(body["password"]).decode('utf-8'),
        is_active=True,
        is_admin=False,
        firstname=body["firstname"],
        lastname=body["lastname"],
        telnumber=body["telnumber"],
        address=body["address"],
        country=body["country"],
        age=body["age"]
    )
    db.session.add(new_user)
    db.session.flush()
    file=request.files['profilePic']
    if file.filename != "":
        extension=file.filename.split(".")[1]
        temp = tempfile.NamedTemporaryFile(delete=False)
        file.save(temp.name)
        bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
        filename="profiles/" + str(new_user.id) + "." + extension
        resource = bucket.blob(filename)
        resource.upload_from_filename(temp.name,content_type="image/"+extension)
        newImage=ProfilePics(resource_path=filename, description="User " + str(new_user.id)+ "'s profile pic")
        db.session.add(newImage)
        db.session.flush()
        new_user.profile_picture_id=newImage.id
        db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"New user created!"}), 200
   
# traer los favoritos
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_Fav_post():
    user_id=get_jwt_identity()
    fav_posts=Fav_posts.query.filter(Fav_posts.user_id==user_id).all()
    return ({"results":list(map(lambda item: item.serialize(),fav_posts))}), 200

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
    crated_fav=Fav_posts.query.filter(Fav_posts.post_id==fav_id, Fav_posts.user_id==user_id).first()
    return jsonify({"results": crated_fav.serialize()}), 200

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
    pagenum = request.args.get('page', 1, type=int)
    posts=Posts.query.order_by(Posts.premium.desc()).order_by(Posts.id.desc()).paginate(page=pagenum, per_page=21, error_out=False)
    return jsonify({"results":list(map(lambda item: item.serializeFull(),posts))}), 200

#traer toda la info de solo una publicacion
@api.route('/posts/<int:post_param>', methods=['GET'])
def get_post_detail(post_param):
    post=Posts.query.filter(Posts.id==post_param).first()
    print(post)
    if post is None:
        return jsonify({"msg":"No post found"})
    return jsonify({"results": post.serializeFull()}), 200

#traer las imagenes de una publicacion
@api.route('/postImages/<int:post_param>', methods=['GET'])
def get_post_images(post_param):
    images=Images.query.filter(Images.post_id==post_param).all()
    if images is None:
        return jsonify({"msg":"No images found"})
    imagelist= list(map(lambda item: item.image_url(),images))
    print(imagelist)
    return jsonify({"results": imagelist}), 200

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
        "miles":"",
        "premium":"",
    }
    for i in body:
        if(i=="financing"):
            body[i]=request.form.get(i)=="true" #bool(request.form.get(i))
        else:
            body[i]=request.form.get(i)
            #body[i] = body[i].strip()
        if(i=="premium"):
            body[i]=request.form.get(i)=="true"
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
        miles=body["miles"],
        premium=body["premium"],
        user_id=user_id
    )
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
            newImage=Images(resource_path=filename, description="Picture for post " + str(new_post.id), imageposition=i)
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
    print(body)
    #for i in body:
    #    if (type(body[i]) != bool or None):
    #        body[i] = body[i].strip()

    post_exists=Posts.query.filter(Posts.id==post_param).first()

    if post_exists != None:

        if post_exists.user_id != user_id:
            return jsonify({"msg":"Not authorized to edit post"})

        post = Posts.query.get(post_param)
        for key in body:
            if (body[key] != ""):
                for col in post.serializeFull():
                    if key == col and key != "id":
                        print(key)
                        setattr(post, col, body[key])
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

#borrar imagen de publicacion
@api.route('/post_images/delete/<int:pic_id>', methods = ['DELETE'])
@jwt_required()
def delete_post_image(pic_id):
    user_id=get_jwt_identity()
    image=Images.query.filter(Images.id==pic_id).first()
    bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
    if image is None:
        return jsonify({'msg':'Image does not exist'}), 404
    if user_id != image.post.user_id:
        return jsonify({"msg":"Not authorized to delete image"}), 403
    resource=bucket.blob(image.resource_path)
    resource.delete()
    db.session.delete(image)
    db.session.commit()
    return jsonify({'msg':'Image Deleted'}), 200

#agregar fotos a publicacion
@api.route('/post_images/upload/<int:post_param>', methods = ['POST'])
@jwt_required()
def upload_post_image(post_param):
    user_id=get_jwt_identity()
    post = Posts.query.filter(Posts.id==post_param).first()
    if post is None:
        return jsonify({'msg':'Post does not exist'}), 404
    post_images=Images.query.filter(Images.post_id==post_param).all()
    files=request.files.getlist('postPic')
    if len(post_images) != 0:
        last_image_position=Images.query.filter(Images.post_id==post_param).order_by(Images.imageposition.desc()).first().imageposition 
        new_position=last_image_position + 1
        for file in files:
            if file.filename!="":
                extension=file.filename.split(".")[1]
                temp = tempfile.NamedTemporaryFile(delete=False)
                file.save(temp.name)
                bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
                filename="posts/"+ str(post_param) +"/" +str(new_position)+ "." + extension
                resource = bucket.blob(filename)
                resource.upload_from_filename(temp.name,content_type="image/"+extension)
                newImage=Images(resource_path=filename, description="Picture for post " + str(post_param), imageposition=new_position)
                newImage.post_id=post_param
                db.session.add(newImage)
                db.session.flush()
                new_position=new_position + 1
        db.session.commit()
        return jsonify({"msg": "New post pictures uploaded"}), 200
    i=1
    for file in files:
        if file.filename!="":
            extension=file.filename.split(".")[1]
            temp = tempfile.NamedTemporaryFile(delete=False)
            file.save(temp.name)
            bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
            filename="posts/"+ str(post_param) +"/" +str(i)+ "." + extension
            resource = bucket.blob(filename)
            resource.upload_from_filename(temp.name,content_type="image/"+extension)
            newImage=Images(resource_path=filename, description="Picture for post " + str(post_param), imageposition=i)
            newImage.post_id=post_param
            db.session.add(newImage)
            db.session.flush()
            i=i+1
        db.session.commit()
        return jsonify({"msg": "New post pictures uploaded"}), 200

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
     

#reinicio de contrsaseña utilizando el token con tiempo limitado 
@api.route('/reset_password', methods=['POST'])
@jwt_required()
def reset_password():
    #claims=get_jwt()
    #if claims['role']=="password":
    jti=get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    new_password=request.json.get("password")
    user_id=get_jwt_identity()
    user=Users.query.get(user_id)
    user.password=cripto.generate_password_hash(new_password).decode('utf-8')
    db.session.add(user)
    db.session.flush()
    blocked_token=TokenBlocklist(jti=jti, created_at=now)
    db.session.add(blocked_token)
    db.session.commit()
    return jsonify({"msg":"La contraseña ha sido actualizada"}), 200
    # else 
    #     return jsonify({"msg":"La contrasenña no puede ser actualizada"}), 401
    
#Solicitud del token para reiniciar contraseña 
@api.route('/requestresetpassword', methods=['POST'])
def request_password():
    email=request.json.get("email")
    print(email)
    user=Users.query.filter(Users.email==email).first()
    print(user)
    if user==None:
        return jsonify({"msg":"Correo no registrado"}),401
    delta=timedelta(minutes=10)
    password_token=create_access_token(identity=user.id, expires_delta=delta)
    template=mail_recovery_template(password_token)
    if send_mail(email, template):
        return jsonify({"msg":"Correo para actualizar la contraseña enviado"}),200
    else:
        return jsonify({"msg":"Correo para actualizar la contraseña no enviado"}),401
    
@api.route ('/uploadProfilePic', methods=['POST'])
@jwt_required()
def uploadPostPic():
    user_id = get_jwt_identity()
    user = Users.query.get(user_id)
    if user is None:
        return jsonify({"msg":"User not found"}), 403

    file=request.files['profilePic']
    extension=file.filename.split(".")[1]
    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp.name)
    bucket=storage.bucket(name="proyecto-final-c6dca.appspot.com")
    filename="profiles/" + str(user_id) + "." + extension
    resource = bucket.blob(filename)
    resource.upload_from_filename(temp.name,content_type="image/"+extension)

    if ProfilePics.query.filter(ProfilePics.resource_path==filename).first() is None:

        newImage=ProfilePics(resource_path=filename, description="User " + str(user_id)+ "'s profile pic")
        db.session.add(newImage)
        db.session.flush()
        user.profile_picture_id=newImage.id
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg":"Image uploaded"}), 200

    return jsonify({"msg":"Image updated"}), 200

