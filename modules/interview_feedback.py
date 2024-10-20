import requests, logging, config
from modules.auth import login_required
from flask import Blueprint, redirect, render_template, request, session

api_header = config.api_header
base_api_url = config.api_url

feedback_bp = Blueprint(
    "Interview Feedback",
    __name__,
    url_prefix="/feedback",
    static_folder="./../static",
    template_folder="./../templates",
)


@feedback_bp.route("/feedback-page/", methods=["GET"])
@login_required
def feedback_page():
    try:
        return render_template("IS_FB.html")
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500




@feedback_bp.route("/feedback-get/", methods=["POST"])
@login_required
def get_feedback():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = request.get_json()
        result = requests.post(
            url=f"{base_api_url}/Interview-Schedule-Panel-Feedback/Detail-Schedule-Interview-Feedback",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500
    
@feedback_bp.route("/feedback-update/", methods=["POST"])
@login_required
def update_feedback():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = request.get_json()
        result = requests.post(
            url=f"{base_api_url}/Interview-Schedule-Panel-Feedback/Update-Schedule-Interview-Feedback",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500