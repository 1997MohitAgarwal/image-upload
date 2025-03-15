from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import boto3
from config import Config

get_images_bp = Blueprint('get_images', __name__)

# Initialize S3 client
s3 = boto3.client(
    's3',
    aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY
)

@get_images_bp.route('', methods=['GET'])
@jwt_required()
def get_images():
    try:
        bucket_name = Config.S3_BUCKET_NAME
        response = s3.list_objects_v2(Bucket=bucket_name)

        if 'Contents' not in response:
            return jsonify({'images': []}), 200

        image_list = [{
            'filename': obj['Key'],
            'url': f"https://{bucket_name}.s3.amazonaws.com/{obj['Key']}"
        } for obj in response['Contents']]

        return jsonify({'images': image_list}), 200

    except Exception as e:
        return jsonify({'message': 'Failed to retrieve images', 'error': str(e)}), 500
