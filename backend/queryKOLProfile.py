from flask import jsonify
from models import db, KOLProfile


def queryAll():
    allData = []
    for item in KOLProfile.query.all():
        temp = {
            "title": item.title,
            "first_name": item.first_name,
            "last_name": item.last_name,
            "pronouns": item.pronouns,
            "institute": item.institute,
            "state": item.state,
            "city": item.city,
            "zip_code": item.zip_code,
            "phone_number": item.phone_number,
            "email": item.email,
        }
        allData.append(temp)
    return jsonify(allData)
