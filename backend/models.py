from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Initialization:
    @staticmethod
    def db_initialization():
        db.drop_all()
        db.create_all()


class KOL(db.Model):
    __tablename__ = "KOL"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(512))

    gender = db.Column(db.String(20))
    age = db.Column(db.Integer)
    location = db.Column(db.String(100))
    occupation = db.Column(db.String(100))


class KOLProfile(db.Model):
    __tablename__ = "KOLProfile"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    occupation = db.Column(db.String(100))
    location = db.Column(db.String(100))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.first_name + " " + self.last_name,
            "title": self.title,
            "occupation": self.occupation,
            "location": self.location,
        }


# class Engagement(db.Model):
#     __tablename__ = "Engagement"
#     id = db.Column(db.Integer, primary_key=True)
#     kol_id = db.Column(db.Integer, db.ForeignKey("kol_profile.id"), nullable=False)
#     engagement_type = db.Column(
#         db.String(50), nullable=False
#     )  # In-Person Meeting, Virtual Meeting, etc.
#     function = db.Column(db.String(50), nullable=False)  # R&D, Medical, etc.
#     notes = db.Column(db.Text)
#     follow_up_requested = db.Column(db.Boolean, default=False)
#     information_requested = db.Column(db.Text)
#     # 使用了relationship来定义这种关系，这允许我们通过KOLProfile模型访问与之关联的Engagement记录。
#     kol_profile = db.relationship(
#         "KOLProfile", backref=db.backref("engagements", lazy=True)
#     )


# class KolProfile(db.Model):
#     __tablename__ = 'kol_profile'
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     Title = db.Column(db.String(50))
#     FirstName = db.Column(db.String(100))
#     LastName = db.Column(db.String(100))
#     Pronouns = db.Column(db.String(50))
#     Institute = db.Column(db.String(255))
#     State = db.Column(db.String(100))
#     City = db.Column(db.String(100))
#     Zip = db.Column(db.String(20))
#     PhoneNumber = db.Column(db.String(20))
#     Email = db.Column(db.String(255))
#     engagements = db.relationship('KolProfileEngagement', backref='kol_profile', lazy=True)

# class KolProfileEngagement(db.Model):
#     __tablename__ = 'kol_profile_engagement'
#     engagementID = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     profileID = db.Column(db.Integer, db.ForeignKey('kol_profile.id'), nullable=False)  # Ensure this matches the table name and primary key
#     engagementA = db.Column(db.String(255))
#     functionA = db.Column(db.String(255))
#     notes = db.Column(db.Text)
#     followUpRequested = db.Column(db.String(255))
#     functionB = db.Column(db.String(255))
#     informationRequested = db.Column(db.Text)
