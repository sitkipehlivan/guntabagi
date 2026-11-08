# Gün Tabağı (guntabagi.com.tr)

Statik site. Kaynak `src/`, çıktı `dist/`.

- Tarifleri düzenle: `src/data.js`
- Siteyi üret: `node src/build.js && sh src/png.sh`
- Yayınla: `dist/` klasörünü Netlify'da Deploys > sürükle-bırak alanına bırak.

## Fotoğraf değiştirme
Gün Tabağı'na özel 8 tarifin kapakları şimdilik illüstrasyon (`dist/img/tarifler/<slug>.svg`).
Gerçek fotoğraf koymak için: fotoğrafı `src/static/img/tarifler/<slug>.jpg` olarak kaydet,
`src/data.js` içinde `t.img = ...svg` satırını `.jpg` yap, yeniden üret.

Slug'lar: patatesli-milfoy-borek, yalanci-tiramisu, etimek-tatlisi, yogurtlu-brokoli-salatasi,
havuc-tarator, corek-otlu-tuzlu-kurabiye, pacanga-boregi, elmali-kurabiye

## Reklam alanları
Sayfalarda `data-advance-slot="..."` olan boş div'ler var (masthead-970x250-masaustu,
tarif-yan-300x250, tarif-ici-mobil-320x100, anasayfa-orta-mobil). Boşken görünmezler;
Advance Reklam etiketi bunları doldurduğunda açılırlar.

## Yayın
Repo Netlify'a bağlı: `main` dalına gelen her push siteyi günceller.
Netlify build komutu çalıştırmaz; `dist/` klasörü yayınlanır. Değişiklikten sonra
`node src/build.js && sh src/png.sh` ile `dist/`'i yeniden üretip commit et.
