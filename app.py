# Gereken kütüphaneleri içeri aktarıyoruz
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

# app.run() ve @app.route ile gerekli ayarları yapmak
# için Flask objesini app değişkenine atıyoruz.
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class Feedback(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    isim = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120))

    mesaj = db.Column(db.Text, nullable=False)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/iyi-kotu-oyun")
def good_bad_game():
    return render_template("gb-game.html")


@app.route("/iklim-degisikligi-form")
def form():
    return render_template("karbon-ayak-izi-form.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/send", methods=["POST"])
def send():
    isim = request.form["name"]
    email = request.form["email"]
    mesaj = request.form["feedback"]
    new_feedback = Feedback(
        isim=isim,
        email=email,
        mesaj=mesaj
    )
    db.session.add(new_feedback)
    db.session.commit()
    return redirect("/")


@app.errorhandler(404)
def not_found(e):
    print(e)
    return render_template("404.html"), 404


# host'u 0.0.0.0 yaparak uygulamanın çalıştığı internetteki
# Herkesin erişebilmesini sağlıyoruz
# debug'ı True yaparak hata ayıklamayı kolaylaştırıyoruz
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
