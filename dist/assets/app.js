(function () {
  // ---- Gün menüsü oluşturucu ----
  var mo = document.getElementById('menu-olusturucu');
  if (mo) {
    var veri = JSON.parse(document.getElementById('menu-veri').textContent);
    var secim = { kim: 'mahalle', kisi: 'orta', vakit: 'dun', butce: 'ay' };
    var kisiNot = { az: 'Tarifler olduğu gibi yeter, bir tabak da yedek dursun.', orta: 'Her tarifi 1,5 katı yap, çay demliğini iki kez doldurmaya hazır ol.', cok: 'Her şeyi iki katı yap ve komşudan sandalye iste.' };
    var butceNot = { ay: 'Sade tarif, şık tabak. Çeyiz servis takımını çıkarma zamanı.', maas: 'Bir çeşit fazla yap, nasılsa yenir.', altin: 'Bir çeşit daha ekle, kenarına ceviz serp. Altın günü ciddiyet ister.', koca: 'Bütçe kocadan geldi: iki çeşit fazla yap, tatlıyı pastaneden de takviye et, fişi buzdolabına mıknatısla as.' };
    var etiket = { dun: 'acil durum modu', gun: 'klasik gün', hafta: 'gösteriş modu', plaza: 'beyaz yaka modu' };
    var notlar = {
      dun: ['Hazır hamur, 45 dakika. Kimse bilmeyecek.', 'Fırın yok, stres yok.', 'Yirmi dakikada biter, sohbet konusu hazır.', 'On dakikalık meyhane şıklığı.'],
      gun: ['Bir gün önceden sar, sabah fırına ver.', 'Bu yoksa gün sayılmaz.', 'Akşamdan yap, dinlensin.', 'Fırınsız tatlı, sakin ev sahibi.'],
      hafta: ['Gösteriş modu açık. Fotoğrafsız yenmez.', 'Kaç saat uğraştığını söyleme.', 'İnce sar, herkes bakacak.', 'Masaya gelince sohbet durur.'],
      plaza: ['Bal ve keçi peyniri: toplantı açılışı.', 'Narlı, rokalı, LinkedIn onaylı.', 'Vegan misafir de unutulmadı.', 'Mascarpone, labneyi geçti.']
    };
    var liste = mo.querySelector('.mo-liste');
    var etk = mo.querySelector('[data-etiket]');
    var str = mo.querySelector('[data-strateji]');
    function ciz() {
      var anahtar = secim.kim === 'ofis' ? 'plaza' : secim.vakit;
      var tarifler = veri[anahtar];
      liste.innerHTML = '';
      tarifler.forEach(function (t, i) {
        var li = document.createElement('li');
        var no = document.createElement('span'); no.className = 'no'; no.textContent = i + 1;
        var d = document.createElement('div');
        var a = document.createElement('a'); a.href = '/tarif/' + t.slug + '/'; a.textContent = t.ad;
        var s = document.createElement('small'); s.textContent = notlar[anahtar][i];
        d.appendChild(a); d.appendChild(s); li.appendChild(no); li.appendChild(d); liste.appendChild(li);
      });
      etk.textContent = etiket[anahtar];
      str.textContent = kisiNot[secim.kisi] + ' ' + butceNot[secim.butce] + (secim.kim === 'ofis' ? ' Ofis ekibi geliyorsa Wi-Fi şifresini kapıya as.' : '');
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


  // ---- Ana sayfa: Bütün Tarifler (2 sıra + canlı arama) ----
  function norm2(s) { return (s || '').toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i'); }
  var al = document.getElementById('ana-liste');
  if (al) {
    var ak = Array.prototype.slice.call(al.querySelectorAll('.kart'));
    var ag = document.getElementById('ana-ara');
    var ab = document.getElementById('ana-bos');
    function anaUygula() {
      var q = norm2(ag.value.trim());
      var limit = window.matchMedia('(max-width: 600px)').matches ? 4 : 8;
      var n = 0;
      ak.forEach(function (k) {
        var uyar = !q || norm2(k.dataset.ara).indexOf(q) > -1;
        var goster = uyar && (q ? true : n < limit);
        if (uyar) n++;
        k.style.display = goster ? '' : 'none';
      });
      ab.style.display = q && !ak.some(function (k) { return k.style.display !== 'none'; }) ? 'block' : 'none';
    }
    ag.addEventListener('input', anaUygula);
    anaUygula();
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
    if (params.get('q')) girdi.value = params.get('q');
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
