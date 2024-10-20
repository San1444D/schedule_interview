from flask import Blueprint, session, jsonify, redirect, request, render_template
from functools import wraps
import requests, logging, os

import config

auth_bp = Blueprint(
    "Auth", __name__, static_folder="./../static/", template_folder="./../templates/"
)

base_api_url = config.api_url
api_header = config.api_header

# Google OAuth 2.0 configuration
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URL = os.getenv("REDIRECT_URL")
AUTH_URL = os.getenv("AUTH_URL")
TOKEN_URL = os.getenv("TOKEN_URL")
SCOPE = os.getenv("SCOPE")


# functions
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if "logged_in" in session and session.get("logged_in"):
            return f(*args, **kwargs)
        else:
            return redirect("/login")

    return wrap


def start_session(token, data):
    session["logged_in"] = True
    session["token"] = token
    return jsonify(data)


# login
@auth_bp.route("/login/", methods=["POST"])
def check_login():
    try:
        result = requests.post(
            f"{base_api_url}/Auth/Login",
            json={"str_Email": request.form["email"], "str_Password": request.form["pwd"]},
            headers= api_header,
        )
        result_data = result.json()
        
        if result.status_code == 200 and result_data["ErrorCode"] == 9999:
            return start_session(result.headers["Authorization"], result_data), 200
        
        return jsonify(result_data), 400
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message" : "web server error"
        }, 500
        


@auth_bp.route("/login/", methods=["GET"])
def login_page():
    try:
        return render_template("login.html")
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message": "web server error"
        }, 500

# signout
@auth_bp.route("/signout/")
def signout():
    try:
        session.clear()
        return redirect("/user/login")
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message": "web server error"
        }, 500


# SIGN WITH GOOGLE
@auth_bp.route("/google/")
def login_with_google():
    try:
        auth_url = (
            f"{AUTH_URL}?response_type=code&"
            f"client_id={CLIENT_ID}&"
            f"redirect_uri={REDIRECT_URL}&"
            f"scope={SCOPE}&"
            f"access_type=offline"
        )
        # print(auth_url)
        return redirect(auth_url)
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message": "web server error"
        }, 500


@auth_bp.route("/callback/")
def callback():
    try:
        code = request.args.get("code")
        token_response = requests.post(
            TOKEN_URL,
            data={
                "code": code,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uri": REDIRECT_URL,
                "grant_type": "authorization_code",
            },
        )
        token_data = token_response.json()
        access_token = token_data.get("access_token")

        # Get user info
        user_info_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        user_info = user_info_response.json()
        print(user_info)

        # Store user information in session
        if user_info["email_verified"]:
            session["logged_in"] = True
            session["user"] = user_info
        # return jsonify(user_info, {"msg": "Success"})
        return redirect("/user/category")
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message": "web server error"
        }, 500
