from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from flask_migrate import Migrate
from model import db
from routes.register import register_bp
from routes.login import login_bp
from routes.upload_image import upload_image_bp
from routes.get_images import get_images_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)  # Initialize SQLAlchemy
migrate = Migrate(app, db)  # Initialize Flask-Migrate
jwt = JWTManager(app)  # Initialize JWT
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Register blueprints with specific URL prefixes
app.register_blueprint(register_bp, url_prefix='/register')
app.register_blueprint(login_bp, url_prefix='/login')
app.register_blueprint(upload_image_bp, url_prefix='/upload')
app.register_blueprint(get_images_bp, url_prefix='/images')

# Database migration setup (handled by Flask-Migrate)
# Flask-Migrate will handle migrations and database schema changes
# No need to manually call db.create_all() if using Flask-Migrate

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)