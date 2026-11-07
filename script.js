(function () {
  var NOMOR = "6282223241193"; /* WhatsApp 0822-2324-1193 */
  var root = document.documentElement;

  /* Tema terang/gelap */
  document.getElementById("tema").addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    root.setAttribute("data-theme", dark ? "light" : "dark");
  });

  /* Menu aktif mengikuti scroll */
  var links = document.querySelectorAll("#menu a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { io.observe(s); });
  }

  /* Galeri: isi atribut data-img dengan alamat foto, misalnya images/seminar-1.jpg */
  document.querySelectorAll("#gallery figure").forEach(function (f) {
    var src = f.getAttribute("data-img");
    if (src) { f.style.backgroundImage = "url('" + src + "')"; f.classList.add("has"); }
  });

  /* Formulir -> WhatsApp */
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = document.getElementById("nama").value.trim(),
        o = document.getElementById("org").value.trim(),
        b = document.getElementById("butuh").value,
        p = document.getElementById("pesan").value.trim(),
        err = document.getElementById("err");
    if (!n || !o || !p) { err.textContent = "Isi nama, perusahaan atau instansi, dan pesan sebelum mengirim."; return; }
    err.textContent = "";
    var t = "Halo MPB Event Organizer, saya " + n + " dari " + o + ".\nKebutuhan: " + b + "\n\n" + p;
    window.open("https://wa.me/" + NOMOR + "?text=" + encodeURIComponent(t), "_blank", "noopener");
  });
})();
