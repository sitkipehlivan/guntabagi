(function () {
  // ---- Gün menüsü oluşturucu ----
  var mo = document.getElementById('menu-olusturucu');
  if (mo) {
    var veri = JSON.parse(document.getElementById('menu-veri').textContent);
    var secim = { kisi: 'orta', vakit: 'dun', butce: 'ay' };
    var kisiNot = { az: 'Tarifler olduğu gibi yeter, bir tabak da yedek dursun.', orta: 'Her tarifi 1,5 katı yap, çay demliğini iki kez doldurmaya hazır ol.', cok: 'Her şeyi iki katı yap ve komşudan sandalye iste.' };
    var butceNot = { ay: 'Sade tarif, şık tabak. Çeyiz servis takımını çıkarma zamanı.', maas: 'Bir çeşit fazla yap, nasılsa yenir.', altin: 'Bir çeşit daha ekle, kenarına ceviz serp. Altın günü ciddiyet ister.' };
    var etiket = { dun: 'acil durum modu', gun: 'klasik gün', hafta: 'gösteriş modu' };
    var notlar = {
      dun: ['Hazır hamur, 45 dakika. Kimse bilmeyecek.', 'Fırın yok, stres yok.', 'Yirmi dakikada biter, sohbet konusu hazır.', 'On dakikalık meyhane şıklığı.'],
      gun: ['Bir gün önceden sar, sabah fırına ver.', 'Bu yoksa gün sayılmaz.', 'Akşamdan yap, dinlensin.', 'Fırınsız tatlı, sakin ev sahibi.'],
      hafta: ['Gösteriş modu açık. Fotoğrafsız yenmez.', 'Kaç saat uğraştığını söyleme.', 'İnce sar, herkes bakacak.', 'Masaya gelince sohbet durur.']
    };
    var liste = mo.querySelector('.mo-liste');
    var etk = mo.querySelector('[data-etiket]');
    var str = mo.querySelector('[data-strateji]');
    function ciz() {
      var tarifler = veri[secim.vakit];
      liste.innerHTML = '';
      tarifler.forEach(function (t, i) {
        var li = document.createElement('li');
        var no = document.createElement('span'); no.className = 'no'; no.textContent = i + 1;
        var d = document.createElement('div');
        var a = document.createElement('a'); a.href = '/tarif/' + t.slug + '/'; a.textContent = t.ad;
        var s = document.createElement('small'); s.textContent = notlar[secim.vakit][i];
        d.appendChild(a); d.appendChild(s); li.appendChild(no); li.appendChild(d); liste.appendChild(li);
      });
      etk.textContent = etiket[secim.vakit];
      str.textContent = kisiNot[secim.kisi] + ' ' + butceNot[secim.butce];
    }
    mo.querySelectorAll('.secenek').forEach(function (b) {
      b.addEventListener('click', function () {
        var grup = b.getAttribute('data-grup');
        secim[grup] = b.getAttribute('data-deger');
        mo.querySelectorAll('.secenek[data-grup="' + grup + '"]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        ciz();
      });
    });
    ciz();
  }

  // ---- Tarif listesi filtre + arama ----
  var fl = document.getElementById('tarif-listesi');
  if (fl) {
    var kartlar = Array.prototype.slice.call(fl.querySelectorAll('.kart'));
    var butonlar = document.querySelectorAll('.filtre button');
    var girdi = document.getElementById('tarif-ara');
    var bos = document.querySelector('.bos');
    var kat = 'hepsi';
    var params = new URLSearchParams(location.search);
    if (params.get('k')) kat = params.get('k');
    function norm(s) { return s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i'); }
    function uygula() {
      var q = norm(girdi.value || '');
      var gorunen = 0;
      kartlar.forEach(function (k) {
        var ok = (kat === 'hepsi' || k.dataset.kategori === kat) && (!q || norm(k.dataset.ara).indexOf(q) > -1);
        k.style.display = ok ? '' : 'none';
        if (ok) gorunen++;
      });
      butonlar.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.k === kat ? 'true' : 'false'); });
      bos.style.display = gorunen ? 'none' : 'block';
    }
    butonlar.forEach(function (b) { b.addEventListener('click', function () { kat = b.dataset.k; uygula(); }); });
    girdi.addEventListener('input', uygula);
    uygula();
  }
})();
