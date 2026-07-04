from app import app, Feedback

import os
import uuid

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

PATH = "feedbacks"
os.makedirs(PATH, exist_ok=True)
with app.app_context():
    feedbacks = Feedback.query.all()

for f in feedbacks:
    with open(os.path.join(PATH, str(uuid.uuid4())+".txt"), "w", encoding="utf-8") as file:
        file.write(f'{"-" * 20}\n')
        file.write(f.isim+"\n")
        file.write(f'{"#" * 10}\n')
        file.write(f"E-posta: {f.email}\n")
        file.write("\n")
        file.write(f.mesaj)
