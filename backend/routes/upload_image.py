from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
import boto3
import os
from werkzeug.utils import secure_filename
from model import db, Image
from config import Config

upload_image_bp = Blueprint('upload_image', __name__)

# Initialize S3 client
s3 = boto3.client(
    's3',
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
)

@upload_image_bp.route('', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    return response, 200

@upload_image_bp.route('', methods=['POST'])
@jwt_required()
def upload():
    user_id = str(get_jwt_identity())
    file = request.files.get('file')

    if not file:
        return jsonify({'message': 'No file provided'}), 400

    filename = secure_filename(file.filename)  # Secure the filename
    unique_filename = f"{os.urandom(16).hex()}_{filename}"

    try:
        s3.upload_fileobj(
            file,
            Config.S3_BUCKET_NAME,
            unique_filename,
            ExtraArgs={'ContentType': file.content_type,
             'ACL': 'public-read'}
        )
    except Exception as e:
        return jsonify({'message': 'Failed to upload file', 'error': str(e)}), 500

    url = f"https://{Config.S3_BUCKET_NAME}.s3.amazonaws.com/{unique_filename}"

    new_image = Image(
        filename=unique_filename,
        url=url,
        user_id=user_id
    )
    db.session.add(new_image)
    db.session.commit()

    return jsonify({'message': 'Image uploaded successfully', 'url': url}), 200
