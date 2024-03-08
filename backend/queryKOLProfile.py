from flask import jsonify
from models import db, KOLProfile
from sqlalchemy import or_


def generateData():
    data = [
        {
            "title": "Dr",
            "first_name": "zhang",
            "last_name": "Galvan",
            "pronouns": "pronouns pronouns",
            "institute": "The University of Texas MD Anderson Cancer Center",
            "state": "TX",
            "city": "Houston",
            "zip_code": "",
            "phone_number": "",
            "email": "123@qq.com",
        },
        {
            "title": "Dr",
            "first_name": "Saad",
            "last_name": "zhang",
            "pronouns": "pronouns pronouns",
            "institute": "The University of Texas MD Anderson Cancer Center",
            "state": "TX",
            "city": "Houston",
            "zip_code": "",
            "phone_number": "",
            "email": "123@qq.com",
        },
    ]

    for item in data:
        kol = KOLProfile(
            title=item["title"],
            first_name=item["first_name"],
            last_name=item["last_name"],
            pronouns=item["pronouns"],
            institute=item["institute"],
            state=item["state"],
            city=item["city"],
            zip_code=item["zip_code"],
            phone_number=item["phone_number"],
            email=item["email"],
        )
        db.session.add(kol)
    db.session.commit()


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


def queryByName(name):
    allData = []
    for item in KOLProfile.query.filter(
        # 或者
        or_(KOLProfile.first_name == name, KOLProfile.last_name == name)
    ).all():
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
