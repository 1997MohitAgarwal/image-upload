import os

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:Password@localhost:5432/image_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # AWS S3 configuration
    S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME', 'myawsbucket-imageupload')
    S3_REGION = os.getenv('S3_REGION', 'ap-south-1')
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID', 'your-aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY', 'your-aws-secret-access-key')

    # Secret keys for JWT and Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-flask-secret-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key')
