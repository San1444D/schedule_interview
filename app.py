from flask import Flask, redirect
import logging
import config

from modules.auth import auth_bp
from modules.interview_schedule import schedule_bp
from modules.interview_feedback import feedback_bp

app = Flask(__name__)
app.secret_key = config.secret_key
app.config['SESSION_TYPE'] = 'filesystem'

# Add Blueprints
app.register_blueprint(auth_bp, url_prefix="/user")
app.register_blueprint(schedule_bp)
app.register_blueprint(feedback_bp)


@app.route("/")
def index():
    try:
        return redirect("/user/login")
    except Exception as e:
        logging.exception(e)
        return {
            "ErrorCode": 9998,
            "Message": "web server error"
        }, 500

if __name__ == "__main__":
    app.run(port="1000", debug=True)
    
