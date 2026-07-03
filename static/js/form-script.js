function hesapla() {
  let puan = 0;

  puan += Number(document.getElementById("car").value);
  puan += Number(document.getElementById("led").value);
  puan += Number(document.getElementById("transport").value);
  puan += Number(document.getElementById("recycle").value);
  puan += Number(document.getElementById("lights").value);
  puan += Number(document.getElementById("plastic").value);
  puan += Number(document.getElementById("water").value);
  puan += Number(document.getElementById("tree").value);

  // Minimum = -5, Maksimum = 60
  const yuzde = (Math.round(((puan + 5) / 65) * 100) - 100) * -1;

  let mesaj = "";

  if (yuzde * -1 + 100 <= 25) {
    mesaj = "🌱 Karbon ayak iziniz oldukça düşük.";
  } else if (yuzde * -1 + 100 <= 50) {
    mesaj = "🌿 Karbon ayak iziniz orta seviyede.";
  } else if (yuzde * -1 + 100 <= 75) {
    mesaj = "⚠️ Karbon ayak iziniz yüksek.";
  } else {
    mesaj = "🔥 Karbon ayak iziniz çok yüksek.";
  }
  let renk = "";

  if (yuzde >= 75) {
    renk = "green";
  } else if (yuzde >= 50) {
    renk = "orange";
  } else {
    renk = "red";
  }
  let bar = document.getElementById("bar");
  bar.style.accentColor = renk;
  document.getElementById("sonuc").innerHTML = `
        <h2>Sonuç</h2>
        <p>Karbon ayak izi puanınız: <b>${puan}</b></p>
        <p>Çevreye etkiniz: <b>%${yuzde * -1 + 100}</b></p>
        <p>${mesaj}</p>
    `;
  document.getElementById("bar").value = yuzde;
}
