import secrets

# Generate random keys
secret_key = secrets.token_hex(32)
jwt_secret_key = secrets.token_hex(32)

# Write to .env file
with open(".env", "a") as env_file:
    env_file.write(f"\nSECRET_KEY={secret_key}\n")
    env_file.write(f"JWT_SECRET_KEY={jwt_secret_key}\n")

print("SECRET_KEY and JWT_SECRET_KEY generated successfully!")
