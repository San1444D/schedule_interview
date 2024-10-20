import os, logging, requests
from modules.auth import login_required
import config
from flask import Blueprint, redirect, render_template, request, jsonify, session

schedule_bp = Blueprint(
    "Interview-Schedule",
    __name__,
    static_folder="./../static/",
    template_folder="./../templates/",
)

api_header = config.api_header
base_api_url = config.api_url


@schedule_bp.route("/schedule-interview/", methods=["GET"])
@login_required
def interview_schedule_page():
    try:
        return render_template("interview_schedule.html")
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500


@schedule_bp.route("/save-interview-schedule/", methods=["POST"])
def save_interview():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = request.get_json()
        result = requests.post(
            url=f"{base_api_url}/Interview-Schedule/Save-Interview-Schedule",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500


@schedule_bp.route("/interview/template-list", methods=["POST"])
@login_required
def list_interview_template():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = request.get_json()
        result = requests.post(
            url=f"{base_api_url}/Interview/Interview-Template/List-Interview-Template",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500


@schedule_bp.route("/interview/template-detail", methods=["POST"])
@login_required
def detail_interview_template():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = request.get_json()
        result = requests.post(
            url=f"{base_api_url}/Interview/Interview-Template/Detail-Interview-Template",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500


@schedule_bp.route("/display-interview")
@login_required
def display_interview():
    try:
        token = {**api_header, "Authorization": session["token"]}
        send_data = {"lng_Interview_Schedule_ID": int(request.args["id"])}
        result = requests.post(
            url=f"{base_api_url}/Interview-Schedule/Details-Interview-Schedule",
            json=send_data,
            headers=token,
        )
        if result.status_code == 200:
            return result.json(), 200
        return result.json(), 400
    except Exception as e:
        logging.exception(e)
        return {"ErrorCode": 9998, "Message": "web server error"}, 500
