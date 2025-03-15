from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from model import db, User

login_bp = Blueprint('login', __name__)

@login_bp.route('', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        # If user is not found, return a specific message
        return jsonify({'message': 'User not found'}), 404
    
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # If login is successful, create the JWT token
    token = create_access_token(identity=str(user.id))
    return jsonify({'access_token': token}), 200
