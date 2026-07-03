# Gereken kütüphaneleri içeri aktarıyoruz
from flask import Flask, render_template

# app.run() ve @app.route ile gerekli ayarları yapmak
# için Flask objesini app değişkenine atıyoruz.
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/iyi-kotu-oyun")
def good_bad_game():
    return render_template("gb-game.html")


@app.route("/iklim-degisikligi-form")
def form():
    return render_template("karbon-ayak-izi-form.html")


# host'u 0.0.0.0 yaparak uygulamanın çalıştığı internetteki
# Herkesin erişebilmesini sağlıyoruz
# debug'ı True yaparak hata ayıklamayı kolaylaştırıyoruz
app.run(host="0.0.0.0", port=5000, debug=True)
