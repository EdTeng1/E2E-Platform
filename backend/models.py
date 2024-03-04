from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class Initialization:
    @staticmethod
    def db_initialization():
        db.drop_all()
        db.create_all()


class KOL(db.Model):
    __tablename__ = 'KOL'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(512))

    gender = db.Column(db.String(20))
    age = db.Column(db.Integer)
    location = db.Column(db.String(100))
    occupation = db.Column(db.String(100))



# 定义 Meeting 模型来存储会议信息
class Meeting(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    first_meeting_contact = db.Column(db.String(100))
    first_meeting_topic = db.Column(db.String(100))
    second_meeting_contact = db.Column(db.String(100))
    second_meeting_topic = db.Column(db.String(100))
    third_meeting_contact = db.Column(db.String(100))
    third_meeting_topic = db.Column(db.String(100))



