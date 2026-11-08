// Gün Tabağı statik site üreticisi: node src/build.js  →  dist/
const fs = require('fs');
const path = require('path');
const D = require('./data');

const SITE = 'https://guntabagi.com.tr';
const OUT = path.join(__dirname, '..', 'dist');
const kat = Object.fromEntries(D.kategoriler.map((k) => [k.id, k.ad]));
const bul = (slug) => D.tumTarifler.find((t) => t.slug === slug);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const surum = (f) => require('crypto').createHash('md5').update(fs.readFileSync(path.join(__dirname, 'static', 'assets', f))).digest('hex').slice(0, 8);
const CSSV = surum('style.css'), JSV = surum('app.js');
const yaz = (rel, icerik) => { const p = path.join(OUT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, icerik); };
const sureYaz = (dk) => (dk >= 60 ? `${Math.floor(dk / 60)} sa${dk % 60 ? ' ' + (dk % 60) + ' dk' : ''}` : `${dk} dk`);

// ---------- Logo ----------
const tabakSvg = (b, halka = '#8E1F3D', kalin = 14) => `<svg width="${b}" height="${b}" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="${100 - kalin / 2 - 12}" fill="none" stroke="${halka}" stroke-width="${kalin}"/><circle cx="100" cy="100" r="36" fill="#C9952E"/></svg>`;
const logoYazi = (renk) => `<span class="logo-yazi" style="color:${renk}">gün<span class="logo-tabak">${tabakSvg(26, renk, 18)}</span>tabağı</span>`;

// ---------- Tarif illüstrasyonları (SVG, 800x600) ----------
function tabak(ic, zemin = '#F6D5D5') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img"><rect width="800" height="600" fill="${zemin}"/>
<g opacity=".35" fill="#FFFFFF"><circle cx="60" cy="70" r="6"/><circle cx="740" cy="90" r="5"/><circle cx="90" cy="520" r="5"/><circle cx="720" cy="530" r="7"/><circle cx="150" cy="300" r="4"/><circle cx="660" cy="310" r="4"/></g>
<ellipse cx="400" cy="318" rx="262" ry="258" fill="#2A1A1F" opacity=".08"/>
<circle cx="400" cy="300" r="255" fill="#FFFFFF" stroke="#EBD3C6" stroke-width="3"/>
<circle cx="400" cy="300" r="228" fill="none" stroke="#C9952E" stroke-width="3" stroke-dasharray="4 9"/>
<circle cx="400" cy="300" r="205" fill="#FFFDF9"/>
${ic}</svg>`;
}
const maydanoz = (x, y) => `<g fill="#5C7A3A"><circle cx="${x}" cy="${y}" r="10"/><circle cx="${x + 13}" cy="${y - 9}" r="8"/><circle cx="${x + 4}" cy="${y - 16}" r="7"/></g>`;
const cizimler = {
  borek: () => tabak([
    [300, 210, -12], [430, 190, 8], [270, 330, 4], [410, 320, -6], [340, 420, 10]
  ].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0 L120 0 L60 95 Z" fill="#E9B872" stroke="#B9822F" stroke-width="4" stroke-linejoin="round"/><path d="M14 10 L106 10" stroke="#F6DDA8" stroke-width="5" stroke-linecap="round"/>${[[30, 22], [55, 30], [80, 20], [50, 50], [68, 44], [60, 68]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.6" fill="#2A1A1F"/>`).join('')}</g>`).join('') + maydanoz(520, 440)),
  tiramisu: () => tabak(`<rect x="250" y="190" width="300" height="220" rx="14" fill="#F3E6D3"/><rect x="250" y="190" width="300" height="220" rx="14" fill="#6B3E26" opacity=".85"/>
${(() => { let r = 7; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647; return Array.from({ length: 90 }, (_, i) => `<circle cx="${(262 + rnd() * 276).toFixed(0)}" cy="${(202 + rnd() * 196).toFixed(0)}" r="${(1.5 + rnd() * 2.5).toFixed(1)}" fill="#3E2216" opacity=".55"/>`).join(''); })()}
<rect x="250" y="392" width="300" height="18" rx="6" fill="#F3E6D3"/><rect x="250" y="372" width="300" height="10" fill="#D9B98F"/><circle cx="560" cy="430" r="16" fill="#6B3E26"/><circle cx="585" cy="445" r="10" fill="#6B3E26"/>`),
  etimek: () => tabak([[310, 230], [430, 220], [290, 350], [410, 345], [520, 300]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="62" fill="#E8C08A" stroke="#B9822F" stroke-width="4"/><circle r="50" fill="#FFF7EE"/><path d="M-36 -8 q36 -26 72 0 q-36 26 -72 0Z" fill="#FFFFFF"/>${[[-20, 18], [8, 22], [24, 8], [-6, -24], [18, -18]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="6" ry="4" fill="#A0652F"/>`).join('')}</g>`).join('')),
  brokoli: () => tabak(Array.from({ length: 16 }, (_, i) => { const a = i * 2.4, r = 40 + (i % 5) * 26; const x = 400 + Math.cos(a) * r, y = 300 + Math.sin(a) * r; return `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><circle r="24" fill="#4E7A2E"/><circle cx="-12" cy="-8" r="13" fill="#5F8F38"/><circle cx="12" cy="-10" r="12" fill="#5F8F38"/><circle cx="2" cy="10" r="11" fill="#3F6824"/></g>`; }).join('') +
    Array.from({ length: 14 }, (_, i) => `<circle cx="${300 + ((i * 67) % 210)}" cy="${210 + ((i * 41) % 190)}" r="7" fill="#F2C744"/>`).join('') +
    `<path d="M300 380 q100 60 200 0" stroke="#FFFFFF" stroke-width="22" fill="none" stroke-linecap="round" opacity=".85"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${330 + i * 30}" y="${250 + (i % 3) * 40}" width="16" height="10" rx="3" fill="#C2342F"/>`).join('')),
  havuc: () => tabak(`<ellipse cx="400" cy="300" rx="160" ry="140" fill="#FFFFFF" stroke="#F0E6DC" stroke-width="3"/>
${Array.from({ length: 70 }, (_, i) => { const a = i * 1.7, r = 12 + (i % 11) * 12; const x = 400 + Math.cos(a) * r, y = 300 + Math.sin(a) * r * .85; return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="22" height="5" rx="2.5" fill="#E8792B" transform="rotate(${(i * 47) % 180} ${x.toFixed(0)} ${y.toFixed(0)})"/>`; }).join('')}
${[[360, 260], [440, 280], [400, 340], [470, 230]].map(([x, y]) => `<path d="M${x} ${y} q8 -12 16 0 q8 12 16 0" fill="#B07A43" stroke="#7A4F25" stroke-width="2"/>`).join('')}
<path d="M300 210 q50 -20 90 10" stroke="#C9A227" stroke-width="5" fill="none" opacity=".8"/>` + maydanoz(470, 360)),
  kurabiye: () => tabak([[310, 220], [410, 200], [500, 250], [290, 330], [390, 310], [490, 360], [340, 420], [440, 420]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="44" fill="#EBC58C" stroke="#C49254" stroke-width="3"/><circle r="44" fill="#F6E0B5" opacity=".45"/>${[[-14, -10], [8, -16], [16, 6], [-6, 14], [0, 0], [-20, 8], [20, -6]].map(([a, b], j) => `<ellipse cx="${a}" cy="${b}" rx="3" ry="2" fill="${j % 2 ? '#2A1A1F' : '#FFF7EE'}"/>`).join('')}</g>`).join('')),
  pacanga: () => tabak([[300, 200, 20], [330, 270, 20], [360, 340, 20], [390, 410, 20]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect width="210" height="58" rx="29" fill="#DDA45A" stroke="#A86F2C" stroke-width="4"/><path d="M30 14 h150" stroke="#F1CB8B" stroke-width="6" stroke-linecap="round"/><rect x="196" y="12" width="20" height="34" rx="8" fill="#B5432F"/><rect x="200" y="20" width="12" height="16" rx="5" fill="#F2D06B"/></g>`).join('') + maydanoz(250, 420) + `<circle cx="560" cy="210" r="22" fill="#F2D06B"/><path d="M548 206 h24" stroke="#C9952E" stroke-width="3"/>`),
  elmali: () => tabak([[300, 230, -20], [420, 200, 10], [520, 290, 40], [300, 360, -10], [420, 330, 0], [400, 440, 20]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-55 10 Q0 -60 55 10 Q0 -20 -55 10Z" fill="#F0D6A8" stroke="#C7A06A" stroke-width="3"/><path d="M-40 4 Q0 -40 40 4" stroke="#E2BE85" stroke-width="5" fill="none"/></g>`).join('') +
    Array.from({ length: 70 }, (_, i) => `<circle cx="${270 + ((i * 59) % 270)}" cy="${170 + ((i * 43) % 300)}" r="${1.5 + (i % 3)}" fill="#FFFFFF"/>`).join(''))
};

// ---------- Ortak şablon ----------
const nav = [
  ['/tarifler/', 'Tarifler'], ['/beyaz-yaka-gunu/', 'Beyaz Yaka Günü'], ['/#menu', 'Gün Menüsü Oluştur'], ['/trend-kosesi/', 'Trend Köşesi'], ['/okur-tabaklari/', 'Okur Tabakları'], ['/gun-sozlugu/', 'Gün Sözlüğü']
];
function sayfa({ baslik, aciklama, yol, govde, aktif = '', ekHead = '', gorsel = '/og.png', tip = 'website' }) {
  const canon = SITE + yol;
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(baslik)}</title>
<meta name="description" content="${esc(aciklama)}">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="${tip}">
<meta property="og:site_name" content="Gün Tabağı">
<meta property="og:title" content="${esc(baslik)}">
<meta property="og:description" content="${esc(aciklama)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${gorsel.startsWith('http') ? gorsel : SITE + gorsel}">
<meta property="og:locale" content="tr_TR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#8E1F3D">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/style.css?v=${CSSV}">
${ekHead}
</head>
<body>
<a class="gizli" href="#icerik">İçeriğe geç</a>
<div class="bant">Uyarı: Bu sitedeki kalori bilgileri yalnızca misafirler için geçerlidir. Ev sahibi gün boyu ayakta olduğundan yaktığı kabul edilir.</div>
<header class="ust"><div class="kap">
<a class="logo" href="/" aria-label="Gün Tabağı ana sayfa">${logoYazi('#2A1A1F')}</a>
<form class="ust-ara" role="search" action="/tarifler/" method="get"><label class="gizli" for="ust-ara-girdi">Tarif ara</label><input id="ust-ara-girdi" type="search" name="q" placeholder="Tarif ara"><button type="submit" aria-label="Ara"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button></form>
<nav class="menu" aria-label="Ana menü">${nav.map(([h, a]) => `<a href="${h}"${aktif === h ? ' aria-current="page"' : ''}>${a}</a>`).join('')}</nav>
</div></header>
<main id="icerik">
${govde}
</main>
<footer class="alt-bilgi"><div class="kap">
<div><div class="logo-y">${logoYazi('#FFF7EE')}</div>
<p>Gün Tabağı bir Advance Digital yayınıdır. Kalorileri saymıyoruz; zaten misafirler yiyor.</p>
<p>Kardeş site: <a href="https://mesaimutfak.com/?utm_source=guntabagi&amp;utm_medium=referral&amp;utm_campaign=footer">Mesai Mutfak</a></p>
<p style="font-size:13px;opacity:.8">© 2026 Gün Tabağı. Tarifler ve metinler izinsiz kopyalanamaz; kopyalayanın börekleri açılır.</p></div>
<nav aria-label="Alt menü"><a href="/kunye/">Künye</a><a href="/kvkk/">KVKK Aydınlatma Metni</a><a href="/cerez-politikasi/">Çerez Politikası</a><a href="/reklam/">Reklam</a><a href="mailto:sales@advancedigital.media">İletişim</a></nav>
</div></footer>
<script src="/assets/app.js?v=${JSV}" defer></script>
</body>
</html>`;
}

const kart = (t) => `<a class="kart" href="/tarif/${t.slug}/" data-kategori="${t.kategori}" data-ara="${esc(t.ad + ' ' + kat[t.kategori] + ' ' + t.rozet + ' ' + t.spot)}">
<div class="foto"><img src="${t.img}" alt="${esc(t.ad)}" loading="lazy" width="700" height="525"></div>
<div class="ic"><span class="rozet">${esc(t.rozet)}</span><h3>${esc(t.ad)}</h3><p>${esc(t.spot)}</p>
<div class="alt"><span>${sureYaz(t.sure)} · ${esc(kat[t.kategori])}</span><span>Kayınvalide onayı <strong>${t.onay}/5</strong></span></div></div></a>`;

const reklam = (ad, cls = '') => `<div class="reklam ${cls}" data-advance-slot="${ad}"></div>`;


// ---------- Gün Öncesi Panik Hattı (bülten) ----------
const panikHatti = (kaynak) => `<section class="bolum panik" id="panik-hatti"><div class="kap"><div class="davet panik-kutu">
<div class="panik-yazi"><div class="el">Her perşembe, gelen kutuna</div><h2>Gün Öncesi Panik Hattı</h2>
<p>Hafta sonu gün sende mi? Perşembe sabahı hazır menü, alışveriş listesi, haftanın trend tarifi ve bir tutam dedikodu gelsin. Panik bizden, alkış senden.</p></div>
<form class="panik-form" name="panik-hatti" method="POST" action="/tesekkurler/" data-netlify="true" netlify-honeypot="adres-alani">
<input type="hidden" name="form-name" value="panik-hatti"><input type="hidden" name="kaynak" value="${kaynak}">
<p class="gizli"><label>Bu alanı boş bırak <input name="adres-alani" tabindex="-1" autocomplete="off"></label></p>
<div class="panik-satir"><label class="gizli" for="eposta-${kaynak}">E-posta adresin</label>
<input id="eposta-${kaynak}" type="email" name="eposta" required autocomplete="email" placeholder="E-posta adresin">
<button type="submit" class="btn dolu">Beni de ekle</button></div>
<label class="onay"><input type="checkbox" name="eposta-onayi" value="evet" required>
<span>Gün Tabağı'nın tarif, menü ve kampanya içerikli (sponsorlu içerikler dahil) e-postalarını almayı kabul ediyorum. <a href="/kvkk/">KVKK Aydınlatma Metni</a>'ni okudum. Onayımı her e-postadaki bağlantıyla geri alabilirim.</span></label>
</form></div></div></section>`;

// ---------- Ana sayfa ----------
const heroSvg = `<svg viewBox="0 0 440 440" role="img" aria-label="Börek, köfte ve tatlı dizilmiş bir gün tabağı çizimi"><circle cx="220" cy="220" r="210" fill="#F6D5D5"/><circle cx="220" cy="220" r="180" fill="#FFFFFF" stroke="#EBD3C6" stroke-width="2"/><circle cx="220" cy="220" r="160" fill="none" stroke="#C9952E" stroke-width="2" stroke-dasharray="3 6"/><path d="M150 140 l60 -20 l-10 62 z" fill="#E9B872" stroke="#B9822F" stroke-width="2"/><path d="M120 200 l58 -14 l-14 58 z" fill="#E9B872" stroke="#B9822F" stroke-width="2"/><ellipse cx="290" cy="150" rx="26" ry="14" fill="#C2562F" transform="rotate(-20 290 150)"/><ellipse cx="320" cy="190" rx="26" ry="14" fill="#C2562F" transform="rotate(-20 320 190)"/><ellipse cx="280" cy="200" rx="26" ry="14" fill="#C2562F" transform="rotate(-20 280 200)"/><rect x="170" y="260" width="110" height="70" rx="10" fill="#7A4A2E"/><rect x="170" y="260" width="110" height="22" rx="10" fill="#F3E6D3"/><circle cx="300" cy="290" r="9" fill="#5C7A3A"/><circle cx="314" cy="276" r="7" fill="#5C7A3A"/><circle cx="140" cy="280" r="8" fill="#5C7A3A"/><circle cx="230" cy="215" r="6" fill="#5C7A3A"/></svg>`;

const heroJpg = path.join(__dirname, 'static', 'img', 'gun-tabagi-hero.jpg');
const heroGorsel = fs.existsSync(heroJpg)
  ? '<img class="hero-foto" src="/img/gun-tabagi-hero.jpg" alt="Börek, yaprak sarma, kısır ve tatlıyla dolu tam takım bir gün tabağı" width="1200" height="1200" fetchpriority="high">'
  : heroSvg;

const secenek = (grup, deger, label, on) => `<button type="button" class="secenek" data-grup="${grup}" data-deger="${deger}" aria-pressed="${on}">${label}</button>`;
const menuVeri = Object.fromEntries(Object.entries(D.menuler).map(([k, v]) => [k, v.map((s) => ({ slug: s, ad: bul(s).ad }))]));

const trendBolum = `<section class="bolum" id="trend"><div class="kap"><div class="trend-kutu">
<div><span class="rozet koyu-r">TREND KÖŞESİ · HER PAZARTESİ</span>
<h2>İnternet bunu konuşuyor, biz gün sofrasına uyarlıyoruz.</h2>
<p>Her hafta sosyal medyada patlayan tarifi bulup "bu bizim günde olur mu?" testinden geçiriyoruz. Geçerse uyarlıyoruz, geçemezse dalgasını geçiyoruz.</p>
<a class="btn" style="align-self:flex-start" href="/trend-kosesi/">Trend Köşesi'ne git</a></div>
<div><div class="trend-kart tk-1"><span class="etiket">ONLARIN VERSİYONU</span><strong>Çekim ışığı, 14 malzeme, üç saat</strong><span>Bir de halka ışık. Ve bir kameraman.</span></div>
<div class="trend-kart tk-2"><span class="etiket">GÜN VERSİYONU</span><strong>Altı malzeme, 40 dakika</strong><span>Evdeki tek ışık: buzdolabının ışığı. Sonuç: aynı alkış.</span></div></div>
</div></div></section>`;

const sozlukBolum = (adet) => `<section class="bolum" id="sozluk"><div class="kap">
<div class="bolum-bas orta"><div><div class="el">Gün dilinden Türkçeye</div><h2>Gün Sözlüğü</h2></div></div>
<div class="sozluk">${D.sozluk.slice(0, adet).map(([s, a]) => `<div class="soz"><q>${esc(s)}</q><div><b>ANLAMI</b><span>${esc(a)}</span></div></div>`).join('')}</div>
${adet < D.sozluk.length ? '<p style="text-align:center;margin-top:26px"><a class="btn" href="/gun-sozlugu/">Sözlüğün tamamı</a></p>' : ''}
</div></section>`;

const anasayfa = sayfa({
  baslik: 'Gün Tabağı | Gün sende mi? Panik yok, tabak bizde.',
  aciklama: 'Kayınvalideyi sessizleştiren, komşuyu kıskandıran gün tarifleri: börekler, mezeler, tatlılar, gün menüsü oluşturucu ve her hafta güncel trend köşesi.',
  yol: '/',
  govde: `
<section class="hero"><div class="kap">
<div class="hero-yazi"><span class="el" style="font-size:30px">Gün sende mi?</span>
<h1>Panik yok,<br>tabak bizde.</h1>
<p>Kayınvalideyi sessizleştiren, komşuyu kıskandıran, "tarifini atar mısın?" dedirten gün tarifleri. Her hafta güncel, her zaman biraz muzip.</p>
<div class="hero-btns"><a class="btn dolu" href="#menu">Gün menümü oluştur</a><a class="btn" href="/tarifler/">Bütün tarifler</a></div></div>
<div class="hero-gorsel">${heroGorsel}<div class="not-kagidi"><div class="el">Tabakta bir şey kalırsa tarif bizden değil, misafirden.</div></div></div>
</div></section>

<section class="koyu" id="menu"><div class="kap bolum">
<div class="mo" id="menu-olusturucu">
<div class="mo-sol"><div><div class="el">30 saniyelik kurtuluş</div><h2 style="font-size:clamp(34px,4.5vw,48px);margin-top:4px">Gün Menüsü Oluşturucu</h2><p>Üç soru, bir menü. Gerisi senin elinin lezzetine kalmış.</p></div>
<fieldset><legend>Kimler geliyor?</legend><div class="secenekler">${secenek('kim', 'mahalle', 'Komşular & akrabalar', true)}${secenek('kim', 'ofis', 'Ofis ekibi (beyaz yaka modu)', false)}</div></fieldset>
<fieldset><legend>Kaç kişi geliyor?</legend><div class="secenekler">${secenek('kisi', 'az', '4–6 (samimi)', false)}${secenek('kisi', 'orta', '7–10 (klasik gün)', true)}${secenek('kisi', 'cok', '11+ (bütün site geliyor)', false)}</div></fieldset>
<fieldset><legend>Ne kadar vaktin var?</legend><div class="secenekler">${secenek('vakit', 'dun', 'Dün akşam haber verdiler', true)}${secenek('vakit', 'gun', 'Bir günüm var', false)}${secenek('vakit', 'hafta', 'Bir haftadır hazırlanıyorum', false)}</div></fieldset>
<fieldset><legend>Bütçe durumu?</legend><div class="secenekler">${secenek('butce', 'ay', 'Ay sonu', true)}${secenek('butce', 'maas', 'Maaş yattı', false)}${secenek('butce', 'altin', 'Altın günü, rezil olamam', false)}</div></fieldset>
</div>
<div class="mo-sonuc" aria-live="polite"><div class="ust-satir"><h3>Senin gün menün</h3><span class="el" data-etiket></span></div>
<ol class="mo-liste"></ol>
<div class="strateji"><strong>Gün stratejisi:</strong> <span data-strateji></span></div></div>
</div>
<script type="application/json" id="menu-veri">${JSON.stringify(menuVeri)}</script>
</div></section>


<section class="bolum" id="tum-tarifler"><div class="kap">
<div class="bolum-bas"><div><div class="el">${D.tumTarifler.length} tarif, tek arama</div><h2>Bütün Tarifler</h2></div>
<div class="ara ana-ara"><label class="gizli" for="ana-ara">Tarif ara</label><input id="ana-ara" type="search" placeholder="Ne pişirsem? börek, kurabiye, vegan..."></div></div>
<div class="izgara iki-sira" id="ana-liste">${D.tumTarifler.map(kart).join('')}</div>
<p class="bos" id="ana-bos">Bu aramaya uyan tarif yok. Belki de yeni bir gün klasiği icat etme zamanı.</p>
<p style="text-align:center;margin-top:26px"><a class="btn dolu" href="/tarifler/">Bütün ${D.tumTarifler.length} tarifi gör</a></p>
</div></section>

${reklam('anasayfa-orta-mobil')}

<section class="bolum" id="tarifler"><div class="kap">
<div class="bolum-bas"><div><div class="el">Kayınvalide testinden geçenler</div><h2>Bu haftanın gün tabağı</h2></div><a href="/tarifler/" style="font-weight:600">Bütün tarifler (${D.tumTarifler.length})</a></div>
<div class="izgara">${D.haftaninTabagi.map((s) => kart(bul(s))).join('')}</div>
</div></section>


<section class="bolum beyaz-yaka" id="beyaz-yaka"><div class="kap">
<div class="by-kutu"><div class="by-yazi"><span class="rozet koyu-r">YENİ KATEGORİ</span><h2>Beyaz Yaka Günü</h2>
<p>Labne yerine mascarpone, nar ekşisi yerine nar tanesi, mayonez yerine Dijon hardalı. Gün sofrasının plaza usulü versiyonu: tartoletler, chia kupları ve vegan tabaklarla.</p>
<a class="btn dolu" href="/beyaz-yaka-gunu/">Bütün beyaz yaka tarifleri</a></div></div>
<div class="izgara">${D.beyazYakaSecki.slice(0, 4).map((s) => kart(bul(s))).join('')}</div>
</div></section>

<section class="bolum" style="padding-top:0"><div class="kap">
<div class="bolum-bas"><div><div class="el">Ne arıyordun?</div><h2>Kategoriler</h2></div></div>
<div class="filtre">${D.kategoriler.map((k) => `<a class="btn" href="/tarifler/?k=${k.id}">${k.ad}</a>`).join('')}</div>
</div></section>


<section class="bolum" id="okur"><div class="kap"><div class="davet okur-davet">
<div style="flex:1 1 380px;min-width:0"><div class="el">Senin tabağın burada olsun</div><h2>Okur Tabakları</h2><p>Günden kalma o güzel tabağın fotoğrafını gönder; en şık, en bereketli, en "kim yaptı bunu" dedirten tabaklar Gün Tabağı'nda yayınlansın.</p></div>
<a class="btn dolu" href="/okur-tabaklari/#gonder">Tabağımı gönder</a>
</div></div></section>

${trendBolum}
${sozlukBolum(6)}

<section class="bolum" id="sunum"><div class="kap"><div class="sunum">
<div><div class="el">Göze girmeyen mideye girmez</div><h2 style="font-size:clamp(34px,4.5vw,48px);margin:4px 0 12px">Sunum Sanatı</h2><p style="color:var(--metin2);margin:0">Lezzet yarı yarıya, gerisi tabak dizimi. Gün öncesi okunması zorunlu kurallar.</p></div>
<ol>${D.sunum.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
</div></div></section>

${panikHatti('anasayfa')}

<section class="bolum" style="padding-top:0"><div class="kap"><div class="davet">
<div style="flex:1 1 380px;min-width:0"><h2>Senin de bir gün tarifin mi var?</h2><p>Herkesin tarifini sorduğu o börek, o kurabiye... Bize yaz, en muzip notlarla Gün Tabağı'nda yayınlayalım.</p></div>
<a class="btn dolu" href="mailto:sales@advancedigital.media?subject=G%C3%BCn%20tarifim">Tarifimi gönder</a>
</div></div></section>`
});

// ---------- Tarifler listesi ----------
const tarifListe = sayfa({
  baslik: 'Gün Tarifleri | Börek, meze, tatlı ve kurabiye | Gün Tabağı',
  aciklama: `Gün sofrası için ${D.tumTarifler.length} tarif: börekler, mezeler, ara sıcaklar, zeytinyağlılar, tatlılar ve kurabiyeler. Kayınvalide onay puanlarıyla.`,
  yol: '/tarifler/', aktif: '/tarifler/',
  govde: `<section class="bolum"><div class="kap">
<div class="bolum-bas"><div><div class="el">Kayınvalide onaylı arşiv</div><h1 style="font-size:clamp(38px,5vw,56px);letter-spacing:-1px;margin-top:4px">Bütün gün tarifleri</h1></div></div>
<div class="filtre" role="group" aria-label="Kategori filtresi"><button type="button" data-k="hepsi" aria-pressed="true">Hepsi</button>${D.kategoriler.map((k) => `<button type="button" data-k="${k.id}" aria-pressed="false">${k.ad}</button>`).join('')}
<div class="ara"><label class="gizli" for="tarif-ara">Tarif ara</label><input id="tarif-ara" type="search" placeholder="Tarif ara: börek, kurabiye..."></div></div>
<div class="izgara" id="tarif-listesi">${D.tumTarifler.map(kart).join('')}</div>
<p class="bos">Bu aramaya uyan tarif yok. Belki de yeni bir gün klasiği icat etme zamanı.</p>
</div></section>`
});

// ---------- Tarif sayfaları ----------
function yanKutu(t) {
  const benzer = D.tumTarifler.filter((x) => x.kategori === t.kategori && x.slug !== t.slug).slice(0, 3);
  const diger = D.tumTarifler.filter((x) => x.kategori !== t.kategori && x.slug !== t.slug);
  const ekle = benzer.length < 3 ? diger.slice(0, 3 - benzer.length) : [];
  return `<aside class="tarif-yan">
<div class="yan-kutu"><b>Menünü tamamla</b><a class="btn dolu" href="/#menu">Gün menüsü oluştur</a></div>
${reklam('tarif-yan-300x250')}
<div class="yan-kutu"><b>Yanına çok yakışır</b>${[...benzer, ...ekle].map((x) => `<a class="mini" href="/tarif/${x.slug}/"><img src="${x.img}" alt="" loading="lazy" width="60" height="60"><span><strong>${esc(x.ad)}</strong>${esc(x.rozet)}</span></a>`).join('')}</div>
</aside>`;
}

// ---------- Gün Kazası Raporu (editoryal espri) ----------
const kazalar = [
  'Revaninin şerbeti sigara böreğine aktıysa: adı artık "tatlı-tuzlu füzyon". Fiyatı iki katı.',
  'Şerbet kısıra sızdıysa panik yok; nar ekşisi zaten tatlı-ekşiydi. Fark eden de ikinci tabağı alır.',
  'Börek tepsisi şerbetli tatlının yanında durunca "şerbetli börek" doğar. Kayınvalide "bizim memlekette böyle yapılır" der, kurtulursun.',
  'Poğaça şekerpareyle aynı tabağa düştüyse bu bir kaza değil, bir aşk hikâyesi. Ayırma, yakışıyorlar.',
  'Şerbet zeytinyağlı sarmaya karıştıysa limonu bol sık ve gururla "Ege usulü" de.',
  'Tuzlu kurabiye şerbete mi düştü? Hemen ye. Delil kalmazsa kaza da yaşanmamıştır.',
  'Mercimek köftesi revani şerbetine bulandıysa üstüne bir marul yaprağı ört ve onu sessizce sahneden indir.',
  'Şerbetli tatlıyı en son ve ayrı tabakta çıkar. Bunu söylüyoruz çünkü biz de yaşadık, hem de iki kez.'
];
const kazaHtml = (slug) => { let h = 0; for (const c of slug) h = (h * 31 + c.charCodeAt(0)) % 9973; const k = kazalar[h % kazalar.length];
  return `<section class="kaza"><div class="kaza-etiket">GÜN KAZASI RAPORU</div><p>${esc(k)}</p><small>Gün Tabağı mutfağından, yaşanmış ya da yaşanacak bir kaza.</small></section>`; };

function karneHtml(karne) {
  return `<section class="karne"><div class="ust-satir"><h2>Gün Karnesi</h2><span class="el">bağımsız olmayan jürimizden</span></div>
<div class="karne-izgara">${karne.map(([ad, p, y]) => `<div class="karne-satir"><div class="ad"><span>${esc(ad)}</span><strong>${p}/5</strong></div><div class="cubuk" role="img" aria-label="${p} / 5"><span style="width:${p * 20}%"></span></div><small>${esc(y)}</small></div>`).join('')}</div></section>`;
}
function tamSayfa(t) {
  const ld = {
    '@context': 'https://schema.org', '@type': 'Recipe', name: t.ad, description: t.spot, image: [SITE + t.img],
    author: { '@type': 'Organization', name: 'Gün Tabağı' }, publisher: { '@type': 'Organization', name: 'Advance Digital' },
    prepTime: `PT${t.hazirlik}M`, cookTime: `PT${t.pisirme}M`, totalTime: `PT${t.sure}M`, recipeYield: t.porsiyon,
    recipeCategory: kat[t.kategori], recipeCuisine: 'Türk',
    recipeIngredient: t.malzemeler.map(([o, a]) => `${o} ${a}`),
    recipeInstructions: t.adimlar.map(([m]) => ({ '@type': 'HowToStep', text: m }))
  };
  return sayfa({
    baslik: `${t.ad} Tarifi | Gün Tabağı`, aciklama: `${t.ad} tarifi: ${t.spot}`, yol: `/tarif/${t.slug}/`, tip: 'article', gorsel: t.img.endsWith('.svg') ? t.img.replace('.svg', '.png') : t.img,
    ekHead: `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
    govde: `<div class="kap">${reklam('masthead-970x250-masaustu')}
<nav class="yol" aria-label="Konum"><a href="/">Ana sayfa</a> / <a href="/tarifler/?k=${t.kategori}">${esc(kat[t.kategori])}</a> / ${esc(t.ad)}</nav>
<div class="tarif-duzen"><article class="tarif-ana">
<div class="tarif-bas"><span class="rozet">${esc(t.rozet)}</span><h1>${esc(t.ad)}</h1><p class="spot">${esc(t.spot)}</p>
<div class="bilgiler"><span><strong>Hazırlık</strong> ${t.hazirlik} dk</span><span><strong>Pişirme</strong> ${t.pisirme} dk</span><span><strong>Porsiyon</strong> ${esc(t.porsiyon)}</span><span><strong>Zorluk</strong> ${esc(t.zorluk)}</span></div></div>
<div class="tarif-foto"><img src="${t.img}" alt="${esc(t.ad)} gün tabağında" width="800" height="600"></div>
${karneHtml(t.karne)}
<section class="tarif-bolum"><h2>Malzemeler</h2><ul class="malzeme">${t.malzemeler.map(([o, a]) => `<li><b>${esc(o)}</b><span>${esc(a)}</span></li>`).join('')}</ul></section>
${reklam('tarif-ici-mobil-320x100')}
<section class="tarif-bolum"><h2>Yapılışı</h2><ol class="adimlar">${t.adimlar.map(([m, l]) => `<li><div><p>${esc(m)}</p><div class="el">${esc(l)}</div></div></li>`).join('')}</ol></section>
<div class="kutular"><section class="kutu pembe"><h2>Gün ipucu</h2><p>${esc(t.ipucu)}</p></section>
<section class="kutu cerceve"><h2>Sorarlarsa ne diyeceksin?</h2><p><strong>${esc(t.sorarlarsa[0])}</strong> diye sorulursa: ${esc(t.sorarlarsa[1])}</p></section></div>
${kazaHtml(t.slug)}
</article>${yanKutu(t)}</div></div>${panikHatti('tarif-' + t.slug)}`
  });
}
function mmSayfa(t) {
  const karne = [
    ['Kayınvalide onayı', t.onay, t.onay >= 5 ? 'Tam puan. Bu tabak eleştiriye kapalıdır.' : 'Bir puanı "benim usulüm farklı" yorumuna gitti.'],
    ['Tarif sorulma ihtimali', Math.min(5, t.onay), 'Linki şimdiden kopyala, WhatsApp gruplarına hazır ol.'],
    ['Tabakta kalma riski', Math.max(0, 5 - t.onay), t.onay >= 4 ? 'Kalırsa ertesi gün çayla biter, merak etme.' : 'Kalırsa paket yap, misafir mutlu gider.']
  ];
  return sayfa({
    baslik: `${t.ad} | Gün Tabağı`, aciklama: `${t.ad}: ${t.spot}`, yol: `/tarif/${t.slug}/`, tip: 'article', gorsel: t.img,
    govde: `<div class="kap">${reklam('masthead-970x250-masaustu')}
<nav class="yol" aria-label="Konum"><a href="/">Ana sayfa</a> / <a href="/tarifler/?k=${t.kategori}">${esc(kat[t.kategori])}</a> / ${esc(t.ad)}</nav>
<div class="tarif-duzen"><article class="tarif-ana">
<div class="tarif-bas"><span class="rozet">${esc(t.rozet)}</span><h1>${esc(t.ad)}</h1><p class="spot">${esc(t.spot)}</p>
<div class="bilgiler"><span><strong>Toplam süre</strong> ${sureYaz(t.sure)}</span><span><strong>Kategori</strong> ${esc(kat[t.kategori])}</span></div></div>
<div class="tarif-foto"><img src="${t.img}" alt="${esc(t.ad)}" width="700" height="438"></div>
${karneHtml(karne)}
<div class="kutular"><section class="kutu pembe"><h2>Gün ipucu</h2><p>${esc(t.ipucu)}</p></section>
<section class="mm-kutu"><h2>Ölçüler ve adımlar</h2><p>Bu klasiğin ölçülü, adım adım tarifi kardeş sitemiz Mesai Mutfak'ta. Bizden gün notları, onlardan gram hesabı.</p><a class="btn dolu" style="align-self:flex-start" href="${t.mmUrl}">Tarifin tamamı Mesai Mutfak'ta</a></section></div>
${kazaHtml(t.slug)}
${reklam('tarif-ici-mobil-320x100')}
</article>${yanKutu(t)}</div></div>${panikHatti('tarif-' + t.slug)}`
  });
}

// ---------- Diğer sayfalar ----------
const trendSayfa = sayfa({
  baslik: 'Trend Köşesi | İnternetin tarifleri, gün versiyonuyla | Gün Tabağı', aciklama: 'Her hafta sosyal medyada konuşulan tarifi gün sofrasına uyarlıyoruz.', yol: '/trend-kosesi/', aktif: '/trend-kosesi/',
  govde: `${trendBolum}${panikHatti('trend')}`
});
const sozlukSayfa = sayfa({
  baslik: 'Gün Sözlüğü | Gün dilinden Türkçeye | Gün Tabağı', aciklama: '"Zahmet etmeseydin" ne demek? Gün sofrasında söylenenlerin gerçek anlamları.', yol: '/gun-sozlugu/', aktif: '/gun-sozlugu/',
  govde: sozlukBolum(D.sozluk.length)
});
const metinSayfa = (yol, baslik, aciklama, html) => sayfa({ baslik: `${baslik} | Gün Tabağı`, aciklama, yol, govde: `<div class="kap"><div class="metin"><h1>${baslik}</h1>${html}</div></div>` });

const kunye = metinSayfa('/kunye/', 'Künye', 'Gün Tabağı künye bilgileri.', `<table>
<tr><td>Yayın adı</td><td>Gün Tabağı (guntabagi.com.tr)</td></tr>
<tr><td>Yayın türü</td><td>Yaygın, süreli internet yayını</td></tr>
<tr><td>İmtiyaz sahibi</td><td>Advance Dijital Medya Reklam Hizmetleri A.Ş.</td></tr>
<tr><td>Adres</td><td>İstiklal Mah. Şehit Ali Çelik Sk. Asran Apt. No: 33 İç Kapı No: 3, Ümraniye / İstanbul</td></tr>
<tr><td>MERSİS No</td><td>0008193677700001</td></tr>
<tr><td>Ticaret Sicil No</td><td>İstanbul Ticaret Odası, 1081503</td></tr>
<tr><td>Vergi Dairesi / No</td><td>Ümraniye / 8193677700</td></tr>
<tr><td>Genel Yayın Yönetmeni</td><td>Sıtkı Pehlivan</td></tr>
<tr><td>İletişim</td><td><a href="mailto:sales@advancedigital.media">sales@advancedigital.media</a></td></tr>
<tr><td>Yer sağlayıcı</td><td>Netlify, Inc.</td></tr>
</table><p>Sitedeki tarifler, metinler ve görseller Gün Tabağı'na aittir; kaynak gösterilmeden kopyalanamaz.</p>`);

const kvkk = metinSayfa('/kvkk/', 'KVKK Aydınlatma Metni', 'Gün Tabağı kişisel verilerin korunması aydınlatma metni.', `
<p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla Advance Dijital Medya Reklam Hizmetleri A.Ş. ("Advance") tarafından guntabagi.com.tr ziyaretçilerini bilgilendirmek amacıyla hazırlanmıştır.</p>
<p><strong>Veri sorumlusu:</strong> Advance Dijital Medya Reklam Hizmetleri A.Ş. · İstiklal Mah. Şehit Ali Çelik Sk. Asran Apt. No: 33 İç Kapı No: 3, Ümraniye / İstanbul · MERSİS: 0008193677700001 · İletişim: <a href="mailto:sales@advancedigital.media">sales@advancedigital.media</a></p>
<h2>Hangi verileri işliyoruz?</h2>
<ul>
<li><strong>Gün Öncesi Panik Hattı:</strong> Bültene kaydolursanız e-posta adresiniz, onay verdiğiniz tarih ve saat ile kaydı yaptığınız sayfa bilgisi.</li>
<li><strong>Okur Tabakları:</strong> Fotoğraf gönderirseniz rumuzunuz, tabak açıklamanız, notunuz, gönderdiğiniz fotoğraf ve onay verdiğiniz tarih ve saat.</li>
<li><strong>İletişim:</strong> Bize e-posta ile yazarsanız e-posta adresiniz ve mesajınızın içeriği.</li>
<li><strong>Trafik kayıtları:</strong> Siteyi ziyaret ettiğinizde, barındırma altyapısı tarafından tutulan IP adresi, tarayıcı bilgisi ve erişim zamanı.</li>
</ul>
<h2>Hangi amaçlarla ve hangi hukuki sebeple?</h2>
<p>Bülten için e-posta adresiniz, size haftalık tarif, menü ve kampanya içerikli e-postalar gönderebilmek amacıyla, 6563 sayılı Kanun kapsamında verdiğiniz onaya dayanarak ve KVKK m.5/2-c (hizmetin sunulması için zorunlu olması) ile m.5/2-ç (onay kayıtlarının saklanmasına ilişkin hukuki yükümlülük) uyarınca işlenir. Onay kayıtları, onayın geri alınmasından itibaren mevzuatın öngördüğü süre boyunca saklanır.</p>
<p>Okur Tabakları'na gönderdiğiniz fotoğraf ve rumuz, sitede ve sosyal medya hesaplarımızda yayınlanması amacıyla KVKK m.5/1 uyarınca açık rızanıza dayanarak işlenir; rızanızı geri aldığınızda yayından kaldırılır ve silinir. Yayınlanmayan gönderiler en geç 6 ay içinde silinir.</p>
<p>E-posta yazışmaları KVKK m.5/2-f uyarınca talebinize yanıt verebilmek için; trafik kayıtları ise KVKK m.5/2-ç uyarınca 5651 sayılı Kanun'dan doğan yükümlülükler ve sitenin güvenliği için işlenir.</p>
<h2>Kimlere aktarılır?</h2>
<p>Veriler; barındırma ve form hizmeti aldığımız Netlify, Inc. ile, bülten gönderimi için kullanacağımız e-posta gönderim hizmeti sağlayıcısıyla ve talep edilmesi hâlinde yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir. Bu hizmet sağlayıcıların sunucuları yurt dışında (Netlify, Inc. için ABD ve küresel içerik dağıtım ağı) bulunduğundan, aktarım KVKK m.9 uyarınca Kişisel Verileri Koruma Kurulu'nun ilan ettiği standart sözleşme ile gerçekleştirilir ve Kurum'a bildirilir. Verileriniz üçüncü kişilere satılmaz ve reklam amacıyla paylaşılmaz.</p>
<h2>Bültenden nasıl çıkarım?</h2>
<p>Her bülten e-postasının altındaki "abonelikten çık" bağlantısını kullanabilir ya da <a href="mailto:sales@advancedigital.media?subject=B%C3%BClten%20iptal">sales@advancedigital.media</a> adresine yazabilirsiniz. Onayınızı geri aldığınızda size bülten gönderilmez.</p>
<h2>Haklarınız</h2>
<p>KVKK m.11 kapsamında verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve diğer haklarınıza ilişkin taleplerinizi <a href="mailto:sales@advancedigital.media">sales@advancedigital.media</a> adresine iletebilirsiniz. Talepleriniz en geç 30 gün içinde yanıtlanır.</p>`);

const cerez = metinSayfa('/cerez-politikasi/', 'Çerez Politikası', 'Gün Tabağı çerez politikası.', `
<p>Gün Tabağı şu anda reklam, analiz ya da takip amaçlı çerez kullanmamaktadır. Sitede yalnızca sayfanın düzgün görüntülenmesi için gerekli teknik altyapı çalışır.</p>
<p>Sitedeki yazı tipleri ve görseller kendi sunucumuzdan ya da kardeş sitemiz Mesai Mutfak'tan yüklenir; Google Fonts gibi üçüncü taraf font servisleri kullanılmaz.</p>
<p>İleride analiz veya reklam çerezleri kullanılmaya başlanırsa, bu sayfa güncellenecek ve çerezler yalnızca açık rızanızla etkinleştirilecektir.</p>
<p>Sorularınız için: <a href="mailto:sales@advancedigital.media">sales@advancedigital.media</a></p>`);

const reklamSayfa = metinSayfa('/reklam/', 'Reklam', 'Gün Tabağı reklam ve iş birliği.', `
<p>Gün Tabağı, ev sahipliği yapan, misafir ağırlamayı seven ve sofrasıyla övünen kadınlara ulaşır. Gıda, mutfak, ev, kozmetik ve perakende markaları için içerik iş birlikleri, sponsorlu tarifler ve görüntülü reklam alanları sunar.</p>
<p>Gün Tabağı bir Advance Digital yayınıdır. Reklam ve iş birlikleri için: <a href="mailto:sales@advancedigital.media?subject=Reklam">sales@advancedigital.media</a></p>`);



const beyazYakaSayfa = sayfa({
  baslik: 'Beyaz Yaka Günü Tarifleri | Plaza usulü gün sofrası | Gün Tabağı',
  aciklama: 'Mascarponeli tiramisu kupları, narlı kısır, hardallı patates salatası, tartoletler, chia puding ve vegan tabaklar: gün sofrasının beyaz yaka versiyonu.',
  yol: '/beyaz-yaka-gunu/', aktif: '/beyaz-yaka-gunu/',
  govde: `<section class="bolum"><div class="kap">
<div class="by-kutu" style="margin-bottom:34px"><div class="by-yazi"><div class="el">Plaza usulü gün sofrası</div><h1>Beyaz Yaka Günü</h1>
<p>Gün bu ay ofis ekibinde mi? Labneyi mascarponeyle, nar ekşisini nar tanesiyle, mayonezi Dijon hardalıyla değiştirdik. Tartoletler, chia kupları, vegan tabaklar: hepsi toplantı arasında hazırlanabilir, hepsi LinkedIn'e layık.</p>
<p class="by-not">Menü oluşturucuda "Ofis ekibi" seçersen sana hazır bir beyaz yaka menüsü çıkarırız.</p>
<a class="btn dolu" href="/#menu">Beyaz yaka menümü oluştur</a></div></div>
<div class="izgara">${D.beyazYakaSecki.map((s) => kart(bul(s))).join('')}</div>
</div></section>${panikHatti('beyaz-yaka')}`
});


const OKUR = require('./okur');
const okurSayfa = sayfa({
  baslik: 'Okur Tabakları | Senin gün tabağın | Gün Tabağı',
  aciklama: 'Okurlarımızın gün tabakları. Sen de günden kalma tabağının fotoğrafını gönder, Gün Tabağı\'nda yayınlansın.',
  yol: '/okur-tabaklari/', aktif: '/okur-tabaklari/',
  govde: `<section class="bolum"><div class="kap">
<div class="bolum-bas"><div><div class="el">Kayınvalide değil, okur onaylı</div><h1 style="font-size:clamp(38px,5vw,56px);letter-spacing:-1px;margin-top:4px">Okur Tabakları</h1></div></div>
${OKUR.length ? `<div class="izgara">${OKUR.map((o) => `<figure class="kart okur-kart"><div class="foto"><img src="${o.foto}" alt="${esc(o.rumuz)} adlı okurumuzun gün tabağı: ${esc(o.tarif)}" loading="lazy"></div><figcaption class="ic"><span class="rozet">${esc(o.tarif)}</span><h3>${esc(o.rumuz)}</h3>${o.not ? `<p>${esc(o.not)}</p>` : ''}</figcaption></figure>`).join('')}</div>`
  : `<div class="okur-bos"><div class="el" style="font-size:30px">Masa kuruldu, misafir bekleniyor.</div><p>Okur Tabakları yeni açıldı. İlk tabak senin olsun; fotoğrafını gönder, burada ilk sırada sen dur.</p></div>`}
</div></section>
<section class="bolum" id="gonder" style="padding-top:0"><div class="kap"><div class="okur-form-kutu">
<div class="okur-form-yazi"><h2>Tabağını gönder</h2>
<p>Gün sofranın fotoğrafını çek, gönder. Ekibimiz bakıp en güzellerini bu sayfada yayınlar. Yayınlamadan önce her fotoğrafı tek tek kontrol ediyoruz.</p>
<ul class="okur-ipucu"><li>Tabak yukarıdan, gün ışığında çekilsin.</li><li>Fotoğrafta yüz olmasın; eller ve bilezikler serbest.</li><li>En fazla 8 MB, JPG ya da PNG.</li></ul></div>
<form class="okur-form" name="okur-tabagi" method="POST" action="/tabak-gonderildi/" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="adres-alani">
<input type="hidden" name="form-name" value="okur-tabagi">
<p class="gizli"><label>Bu alanı boş bırak <input name="adres-alani" tabindex="-1" autocomplete="off"></label></p>
<label class="alan"><span>Rumuzun <small>(sayfada bu görünür)</small></span><input type="text" name="rumuz" required maxlength="40" placeholder="Örn. Ayşe H. ya da Börekçi Teyze"></label>
<label class="alan"><span>Tabakta ne var?</span><input type="text" name="tarif" required maxlength="80" placeholder="Örn. Patatesli milföy, kısır, revani"></label>
<label class="alan"><span>Kısa bir not <small>(isteğe bağlı)</small></span><textarea name="not" rows="3" maxlength="280" placeholder="Kayınvalide ne dedi? Tabakta bir şey kaldı mı?"></textarea></label>
<label class="alan"><span>Fotoğraf</span><input type="file" name="fotograf" accept="image/jpeg,image/png,image/webp" required></label>
<label class="onay"><input type="checkbox" name="yayin-onayi" value="evet" required><span>18 yaşından büyüğüm ve gönderdiğim fotoğrafı kendim çektim. Fotoğrafın ve rumuzumun Gün Tabağı'nda ve sosyal medya hesaplarında yayınlanmasına açık rıza veriyorum. <a href="/kvkk/">KVKK Aydınlatma Metni</a>'ni okudum; rızamı istediğim zaman <a href="mailto:sales@advancedigital.media">sales@advancedigital.media</a> adresine yazarak geri alabilirim.</span></label>
<button type="submit" class="btn dolu" style="align-self:flex-start">Tabağımı gönder</button>
</form></div></div></section>`
});
const gonderildi = sayfa({
  baslik: 'Tabağın bize ulaştı | Gün Tabağı', aciklama: 'Okur tabağı gönderin alındı.', yol: '/tabak-gonderildi/',
  ekHead: '<meta name="robots" content="noindex">',
  govde: `<div class="kap"><div class="metin" style="text-align:center;margin:0 auto"><div class="el" style="font-size:34px">Tabak teslim alındı!</div><h1>Elinize sağlık.</h1><p>Fotoğrafına bakıp kısa süre içinde Okur Tabakları'nda yayınlayacağız. O zamana kadar çayını tazele.</p><p><a class="btn dolu" href="/okur-tabaklari/">Okur Tabakları'na dön</a></p></div></div>`
});

const tesekkur = sayfa({
  baslik: 'Panik Hattına hoş geldin | Gün Tabağı', aciklama: 'Gün Öncesi Panik Hattı kaydın alındı.', yol: '/tesekkurler/',
  ekHead: '<meta name="robots" content="noindex">',
  govde: `<div class="kap"><div class="metin" style="text-align:center;margin:0 auto"><div class="el" style="font-size:34px">Kayıt tamam!</div><h1>Panik hattına hoş geldin.</h1><p>İlk e-postan perşembe sabahı geliyor. O zamana kadar çayı demle, servis tabaklarını tozdan arındır.</p><p>Gelmezse spam klasörüne bak; orada da yoksa bize yaz, belki dedikoduya dalmışızdır.</p><p><a class="btn dolu" href="/#menu">Şimdiden menünü oluştur</a></p></div></div>`
});

const bulunamadi = sayfa({
  baslik: 'Sayfa bulunamadı | Gün Tabağı', aciklama: 'Aradığın sayfa bulunamadı.', yol: '/404',
  govde: `<div class="kap"><div class="metin" style="text-align:center;margin:0 auto"><div class="el" style="font-size:34px">Eyvah!</div><h1>Bu tabak boş çıktı.</h1><p>Aradığın sayfa ya hiç yoktu ya da misafirler bitirdi.</p><p><a class="btn dolu" href="/tarifler/">Tariflere dön</a></p></div></div>`
});

// ---------- Yaz ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(path.join(__dirname, 'static'), OUT, { recursive: true });
yaz('index.html', anasayfa);
yaz('tarifler/index.html', tarifListe);
yaz('trend-kosesi/index.html', trendSayfa);
yaz('gun-sozlugu/index.html', sozlukSayfa);
yaz('kunye/index.html', kunye);
yaz('kvkk/index.html', kvkk);
yaz('cerez-politikasi/index.html', cerez);
yaz('reklam/index.html', reklamSayfa);
yaz('404.html', bulunamadi);
yaz('tesekkurler/index.html', tesekkur);
yaz('beyaz-yaka-gunu/index.html', beyazYakaSayfa);
yaz('okur-tabaklari/index.html', okurSayfa);
yaz('tabak-gonderildi/index.html', gonderildi);
D.tamTarifler.forEach((t) => { yaz(`img/tarifler/${t.slug}.svg`, cizimler[t.cizim]()); yaz(`tarif/${t.slug}/index.html`, tamSayfa(t)); });
D.mmTarifler.forEach((t) => yaz(`tarif/${t.slug}/index.html`, mmSayfa(t)));
yaz('favicon.svg', tabakSvg(48, '#8E1F3D', 22).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));

const urls = ['/', '/tarifler/', '/beyaz-yaka-gunu/', '/okur-tabaklari/', '/trend-kosesi/', '/gun-sozlugu/', '/kunye/', '/kvkk/', '/cerez-politikasi/', '/reklam/', ...D.tumTarifler.map((t) => `/tarif/${t.slug}/`)];
yaz('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>2026-11-08</lastmod></url>`).join('\n')}\n</urlset>\n`);
yaz('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
yaz('netlify.toml', `[build]\n  publish = "."\n\n[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Content-Type-Options = "nosniff"\n    Referrer-Policy = "strict-origin-when-cross-origin"\n    X-Frame-Options = "SAMEORIGIN"\n\n[[headers]]\n  for = "/assets/*"\n  [headers.values]\n    Cache-Control = "public, max-age=604800"\n\n[[headers]]\n  for = "/img/*"\n  [headers.values]\n    Cache-Control = "public, max-age=2592000"\n`);
console.log('Sayfa sayısı:', urls.length + 1, '| Tarif:', D.tumTarifler.length);
