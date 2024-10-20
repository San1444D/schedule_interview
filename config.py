import os

api_url = os.getenv("API_URL")
secret_key = os.getenv("SECRET_KEY")

api_header = {
    "Accept": "application/json", 
    "Content-Type": "application/json"
    }