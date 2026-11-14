// Gün Tabağı — tarif verisi
// tip: "tam" = tarifin tamamı Gün Tabağı'nda; "mm" = ölçü ve adımlar kardeş site Mesai Mutfak'ta

const MM = (slug) => `https://mesaimutfak.com/tarif/${slug}/?utm_source=guntabagi&utm_medium=referral&utm_campaign=gun_tabagi`;
const MMIMG = (slug) => `https://mesaimutfak.com/.netlify/images?url=%2Fimg%2Ftarifler%2F${slug}.jpg&w=700&q=72`;

const kategoriler = [
  { id: 'borek', ad: 'Börek & Hamur İşi' },
  { id: 'meze', ad: 'Meze & Salata' },
  { id: 'arasicak', ad: 'Ara Sıcak' },
  { id: 'zeytinyagli', ad: 'Zeytinyağlı' },
  { id: 'tatli', ad: 'Tatlı' },
  { id: 'kurabiye', ad: 'Kurabiye & Kek' },
  { id: 'beyazyaka', ad: 'Beyaz Yaka Günü' }
];

// ---------- Tarifin tamamı burada olanlar ----------
const tamTarifler = [
  {
    slug: 'patatesli-milfoy-borek', ad: 'Patatesli Milföy Börek', kategori: 'borek', cizim: 'borek',
    spot: 'Aceleci ev sahibinin can simidi. Zil çalınca fırından yeni çıkmış gibi yaparsın, kimse hazır hamur olduğunu anlamaz.',
    rozet: 'Bir gece önceden yapılır', hazirlik: 20, pisirme: 25, porsiyon: '16 parça', zorluk: 'Gelin adayı bile yapar',
    karne: [
      ['Kayınvalide onayı', 4, 'Bir puan "benimki daha çıtır" diye kırıldı.'],
      ['Tarif sorulma ihtimali', 5, 'Telefonunu şarjda tut, WhatsApp yağacak.'],
      ['Tabakta kalma riski', 1, 'Kalırsa da ertesi sabah çayla biter.'],
      ['Diyetteyim diyenin ikinci dilimi', 5, '"Küçük bir tane daha" diyecek. Küçük olmayacak.'],
      ['Fotoğrafı çekilmeden yenme ihtimali', 0, 'Önce story, sonra lokma. Kural bu.']
    ],
    malzemeler: [
      ['1 paket', 'milföy hamuru (500 g, buzdolabında çözülmüş)'], ['4 adet', 'orta boy patates'], ['1 adet', 'kuru soğan'],
      ['2 yemek kaşığı', 'sıvı yağ'], ['1 çay kaşığı', 'tuz'], ['1 çay kaşığı', 'pul biber'], ['½ çay kaşığı', 'karabiber'],
      ['½ demet', 'maydanoz'], ['1 adet', 'yumurta sarısı (üzeri için)'], ['1 yemek kaşığı', 'çörek otu']
    ],
    adimlar: [
      ['Patatesleri kabuklarıyla haşla, soyup çatalla ez.', 'Blender çıkarma. Sonra onu da sen yıkayacaksın.'],
      ['Soğanı ince doğra, sıvı yağda pembeleşene kadar kavur. Patatese ekle; tuz, pul biber, karabiber ve kıyılmış maydanozla karıştır.', 'Harcın tadına bak. Bu aşamada yarısını yemek normaldir, hesaba katılmıştır.'],
      ['Milföy karelerini ikiye kes. Her parçanın ortasına bir tatlı kaşığı harç koy, üçgen olacak şekilde kapat ve kenarlarını çatalla bastır.', 'Kenarı açılan börek, günün dedikodu konusu olur.'],
      ['Börekleri yağlı kâğıt serili tepsiye aralıklı diz. Üzerlerine yumurta sarısı sür, çörek otu serp.', 'Aralarında boşluk bırak. Kabarınca birbirine yapışmasınlar, misafirler de.'],
      ['Önceden ısıtılmış 200°C fırında üzeri kızarana kadar yaklaşık 25 dakika pişir.', 'Fırın camından otuz saniyede bir bakmak süreyi kısaltmıyor. Denedik.']
    ],
    ipucu: 'Böreği bir gece önceden hazırlayıp çiğ hâlde dondurabilirsin. Sabah çözdürmeden fırına ver, beş dakika fazla pişir. Misafir geldiğinde ev mis gibi börek kokar, sen de "az önce yaptım" dersin.',
    sorarlarsa: ['"Hazır hamur mu?"', '"Annemin usulü." Annenin de hazır hamur kullandığını kimsenin bilmesine gerek yok.']
  },
  {
    slug: 'yalanci-tiramisu', ad: 'Yalancı Tiramisu', kategori: 'tatli', cizim: 'tiramisu',
    spot: 'Mascarpone yok, İtalyan yok, stres yok. Kimse yalancı olduğunu anlamaz; sen de söyleme, aramızda kalsın.',
    rozet: 'Fırın yok, panik yok', hazirlik: 30, pisirme: 10, porsiyon: '12 dilim', zorluk: 'Kolay, ama dolapta 4 saat sabır ister',
    karne: [
      ['Kayınvalide onayı', 5, '"Bunu nereden aldın?" diye sorarsa tam puan.'],
      ['Tarif sorulma ihtimali', 5, 'Tarifi vermeden önce bir kahve ısmarlat.'],
      ['Tabakta kalma riski', 0, 'Kalmaz. Kalırsa sen yersin, o da kalmaz.'],
      ['"Gerçek tiramisu mu?" sorusu', 4, 'Cevap: "Ev tiramisusu." Teknik olarak yalan değil.'],
      ['Gece mutfakta kaşıkla yeme ihtimali', 5, 'Buzdolabının ışığı tanıklık eder, kimseye söylemez.']
    ],
    malzemeler: [
      ['1 litre', 'süt'], ['1 su bardağı', 'toz şeker'], ['3 yemek kaşığı', 'un'], ['2 yemek kaşığı', 'buğday nişastası'],
      ['1 paket', 'vanilin'], ['1 paket', 'toz krem şanti'], ['½ su bardağı', 'soğuk süt (krem şanti için)'],
      ['2 paket', 'pötibör bisküvi (yaklaşık 350 g)'], ['1 su bardağı', 'ılık su'], ['2 tatlı kaşığı', 'granül kahve'], ['2 yemek kaşığı', 'kakao (üzeri için)']
    ],
    adimlar: [
      ['Süt, şeker, un ve nişastayı tencerede çırparak karıştır. Orta ateşte, sürekli karıştırarak koyulaşana kadar pişir. Ocaktan alınca vanilini ekle.', 'Karıştırmayı bırakırsan dibi tutar. Telefonu bırak, kaşığı bırakma.'],
      ['Muhallebinin üzerine streç film değdirerek tamamen soğumaya bırak.', 'Streç film kaymak bağlamasın diye. Kaymak sevenler sessiz olsun, bu tatlıda yeri yok.'],
      ['Krem şantiyi soğuk sütle mikserde kabarana kadar çırp, soğumuş muhallebiye ekleyip mikserle bir dakika daha çırp.', 'Krema ipeksi olmalı. Fotoğrafını çekip kendi kendine beğen.'],
      ['Granül kahveyi ılık suda erit. Bisküvileri kahveye hızlıca batırıp çıkar, borcamın tabanına diz; üzerine kremanın yarısını yay. Bir kat daha bisküvi, bir kat daha krema.', 'Bisküviyi kahvede bekletme. Yalancı tiramisu olur, lapa tiramisu olmasın.'],
      ['Üzerine kakaoyu süzgeçten ele. Buzdolabında en az 4 saat, tercihen bir gece dinlendir.', 'Dört saat beklemek zor, biliyoruz. Bu süre dedikodu provası için birebirdir.']
    ],
    ipucu: 'Bir gece önceden yap, kakaoyu servisten hemen önce ele. Böylece kakao nemlenip lekelenmez, tatlı vitrinden çıkmış gibi durur.',
    sorarlarsa: ['"İçinde mascarpone var mı?"', '"Sır." Gülümse ve konuyu çay demine getir.']
  },
  {
    slug: 'etimek-tatlisi', ad: 'Etimek Tatlısı', kategori: 'tatli', cizim: 'etimek',
    spot: 'Fırına girmez, şerbet istemez, kimseyi terletmez. Gün tatlılarının sessiz kahramanı.',
    rozet: 'Fırınsız kurtarıcı', hazirlik: 25, pisirme: 10, porsiyon: '10-12 kişilik', zorluk: 'Göz kapalı',
    karne: [
      ['Kayınvalide onayı', 4, 'Kendi yaptığından iyi olmasın diye bir puan eksik verdi.'],
      ['Tarif sorulma ihtimali', 4, '"Bu kadar kolay mıydı?" diye sorulacak. Evet ama söyleme.'],
      ['Tabakta kalma riski', 1, 'Dördüncü dilimde utanıp bırakan bile olur, ama döner.'],
      ['Bütçe dostluğu', 5, 'Ay sonu günlerinin resmi tatlısı.'],
      ['Ev sahibi stresi', 1, 'Yarım saatte biter, kalan sürede ojeni sürersin.']
    ],
    malzemeler: [
      ['1 paket', 'etimek (yaklaşık 20 adet)'], ['1 su bardağı', 'ılık süt (ıslatmak için)'], ['1 litre', 'süt'],
      ['1 su bardağı', 'toz şeker'], ['3 yemek kaşığı', 'un'], ['2 yemek kaşığı', 'buğday nişastası'], ['1 paket', 'vanilin'],
      ['1 yemek kaşığı', 'tereyağı'], ['1 paket', 'toz krem şanti'], ['½ su bardağı', 'soğuk süt (krem şanti için)'], ['½ su bardağı', 'dövülmüş fındık ya da Hindistan cevizi']
    ],
    adimlar: [
      ['Etimekleri borcama yan yana diz. Üzerlerine ılık sütü kaşıkla gezdirerek hafifçe ıslat.', 'Hafifçe dedik. Etimeği boğarsan tatlı değil, mama olur.'],
      ['Süt, şeker, un ve nişastayı tencerede çırp; orta ateşte sürekli karıştırarak koyulaşana kadar pişir. Ocaktan alıp tereyağı ve vanilini ekle.', 'Tereyağı muhallebiye parlaklık verir. Sen de fotoğrafa parlaklık verirsin.'],
      ['Sıcak muhallebiyi etimeklerin üzerine dök ve yüzeyini düzelt. Oda sıcaklığına gelince buzdolabına al.', 'Sıcakken dökmek etimeğin muhallebiyi içmesini sağlar. Bilimsel değil ama doğru.'],
      ['Tamamen soğuyunca krem şantiyi soğuk sütle çırpıp üzerine yay, fındık ya da Hindistan cevizi serp.', 'Hindistan cevizi mi fındık mı tartışması çıkarsa, yarısını öyle yarısını böyle yap. Barış elçisi ol.'],
      ['Servisten önce en az 3 saat buzdolabında dinlendir, kare kare kes.', 'Kenar dilim ev sahibinindir. Bu kural anayasada yazmasa da geçerlidir.']
    ],
    ipucu: 'Bir gün önceden yaparsan dilimler çok daha düzgün kesilir. Bıçağı her kesimden önce sıcak suya batır; kare dilimler pastane vitrini gibi durur.',
    sorarlarsa: ['"Bu revani mi?"', '"Etimek tatlısı, annemin kardeşinin komşusunun tarifi." Kimse takip edemez, soru biter.']
  },
  {
    slug: 'yogurtlu-brokoli-salatasi', ad: 'Yoğurtlu Brokoli Salatası', kategori: 'meze', cizim: 'brokoli',
    spot: '"Ben diyetteyim" diyen misafirin kaçış rotası. Kaçış rotası olarak başlar, üçüncü tabakta ana yemeğe döner.',
    rozet: 'Diyetteyim diyenin sığınağı', hazirlik: 20, pisirme: 5, porsiyon: '8 kişilik', zorluk: 'Kolay',
    karne: [
      ['Kayınvalide onayı', 3, '"Brokoli de nereden çıktı" dedi, sonra iki kez aldı.'],
      ['Sağlıklı görünme puanı', 5, 'Masada bu varsa böreklere vicdan rahat dokunulur.'],
      ['Tarif sorulma ihtimali', 4, 'Spor salonundaki arkadaş grubuna kesin gider.'],
      ['Renk katkısı', 5, 'Sofranın yeşil ışığı. Fotoğraf için ortaya koy.'],
      ['Sarımsak riski', 2, 'Tek diş yeter. Gün sonrası sarılma planın varsa.']
    ],
    malzemeler: [
      ['1 adet', 'orta boy brokoli'], ['1,5 su bardağı', 'süzme yoğurt'], ['2 yemek kaşığı', 'mayonez'], ['1 diş', 'sarımsak'],
      ['½ su bardağı', 'konserve mısır'], ['1 adet', 'kapya biber'], ['⅓ su bardağı', 'ceviz içi'], ['½ demet', 'dereotu'], ['1 çay kaşığı', 'tuz']
    ],
    adimlar: [
      ['Brokoliyi küçük çiçeklerine ayır. Kaynar tuzlu suda 3-4 dakika haşla, hemen buzlu suya al ve süz.', 'Buzlu su rengini yemyeşil tutar. Haşlarken unutursan grileşir, gri brokoli kimseyi mutlu etmez.'],
      ['Yoğurt, mayonez, ezilmiş sarımsak ve tuzu bir kasede karıştır.', 'Mayonez isteğe bağlı derler. Değil.'],
      ['Brokoli, mısır, küçük doğranmış kapya biber, iri kırılmış ceviz ve kıyılmış dereotunu sosla harmanla.', 'Nazikçe karıştır, brokoli çiçekleri dağılmasın. Bu salata bir kez kırılırsa toparlanmaz.'],
      ['Servis tabağına al, üzerine birkaç ceviz ve kapya biber parçası koyarak süsle. Soğuk servis et.', 'Süslemeyi atlama. Göze girmeyen salata, diyet yapana bile yenmez.']
    ],
    ipucu: 'Brokoliyi ve sosu ayrı ayrı bir gün önceden hazırlayabilirsin; servisten bir saat önce birleştir ki yoğurt sulanmasın.',
    sorarlarsa: ['"Bunda kaç kalori var?"', '"Brokoli var, brokoli kalori sayılmaz." Bilimsel değil, gün kuralı.']
  },
  {
    slug: 'havuc-tarator', ad: 'Havuç Tarator', kategori: 'meze', cizim: 'havuc',
    spot: 'Turuncusuyla sofranın en fotojenik mezesi. Her günde bir tane olur ve her seferinde ilk o biter.',
    rozet: 'Her günün demirbaşı', hazirlik: 15, pisirme: 10, porsiyon: '6-8 kişilik', zorluk: 'Kolay',
    karne: [
      ['Kayınvalide onayı', 5, 'Onun da tarifi aynı. Tartışacak konu bulamadı.'],
      ['Tarif sorulma ihtimali', 2, 'Herkes biliyor. Ama yine de "seninki nasıl bu kadar güzel" diyecekler.'],
      ['Tabakta kalma riski', 1, 'Kalırsa ertesi gün ekmeğe sür, ödülündür.'],
      ['Fotojeniklik', 5, 'Turuncu ve beyaz. Instagram bunu sever.'],
      ['Önceden yapılabilirlik', 5, 'Bir gün dinlenince daha da güzelleşir. Sen de dinlen.']
    ],
    malzemeler: [
      ['4 adet', 'orta boy havuç'], ['2 yemek kaşığı', 'zeytinyağı'], ['1,5 su bardağı', 'süzme yoğurt'], ['1 diş', 'sarımsak'],
      ['½ çay kaşığı', 'tuz'], ['⅓ su bardağı', 'ceviz içi'], ['birkaç dal', 'dereotu (isteğe bağlı)']
    ],
    adimlar: [
      ['Havuçları rendenin kalın tarafıyla rendele.', 'Parmağını rendeleme. Gün tarifinde kan yok, sadece dedikodu var.'],
      ['Zeytinyağını tavada ısıt, havuçları ekleyip yumuşayana kadar 7-8 dakika kavur. Tamamen soğut.', 'Soğumadan yoğurda katarsan yoğurt kesilir. Sabırsızlık burada affedilmez.'],
      ['Yoğurt, ezilmiş sarımsak ve tuzu karıştır. Soğumuş havuçları ve kırılmış cevizin çoğunu ekle.', 'Biraz ceviz ayır, süs için lazım.'],
      ['Servis tabağına al, üzerine kalan ceviz ve dereotunu koy, bir tur zeytinyağı gezdir.', 'Zeytinyağı gezdirmek sofraya "ben bu işi biliyorum" mesajı verir.']
    ],
    ipucu: 'Bir gece önceden yap, buzdolabında dinlensin; tatlar oturur. Servis öncesi zeytinyağı ve cevizi tazele.',
    sorarlarsa: ['"Sen havucu çiğ mi koyuyorsun?"', '"Kavuruyorum." Ve bu tartışma burada sona eriyor.']
  },
  {
    slug: 'corek-otlu-tuzlu-kurabiye', ad: 'Çörek Otlu Tuzlu Kurabiye', kategori: 'kurabiye', cizim: 'kurabiye',
    spot: 'Ağızda dağılan, çayın yanında üçüncüsüne el uzatılan klasik. "Ben bir tane alayım" diyenin elinde beş tane olur.',
    rozet: 'Tarif sorulma ihtimali: yüksek', hazirlik: 25, pisirme: 25, porsiyon: '35-40 adet', zorluk: 'Kolay',
    karne: [
      ['Kayınvalide onayı', 4, 'Bir puanı "biraz daha tuz" yorumuna gitti.'],
      ['Tarif sorulma ihtimali', 5, 'Kâğıda yazıp çantanda taşı, zaman kazanırsın.'],
      ['Çayla uyum', 5, 'Demli çay + bu kurabiye = günün asıl sebebi.'],
      ['"Bir tane daha" sayacı', 5, 'Sayan yok, saymayan çok.'],
      ['Saklanma süresi', 4, 'Kapalı kapta bir hafta. Ama bir hafta yaşamaz.']
    ],
    malzemeler: [
      ['125 g', 'tereyağı (oda sıcaklığında)'], ['½ su bardağı', 'sıvı yağ'], ['½ su bardağı', 'yoğurt'], ['1 adet', 'yumurta (beyazı hamura, sarısı üzerine)'],
      ['1 paket', 'kabartma tozu'], ['1 tatlı kaşığı', 'tuz'], ['1 tatlı kaşığı', 'toz şeker'], ['3,5 su bardağı', 'un (aldığı kadar)'], ['2 yemek kaşığı', 'çörek otu ve susam']
    ],
    adimlar: [
      ['Tereyağı, sıvı yağ, yoğurt, yumurta beyazı, tuz ve şekeri yoğurma kabında karıştır.', 'Tereyağı oda sıcaklığında olsun. Mikrodalgada eritirsen kurabiye değil, kraker olur.'],
      ['Kabartma tozunu ve unu azar azar ekleyerek ele yapışmayan, yumuşak bir hamur yoğur.', 'Unun hepsini bir anda dökme. "Aldığı kadar" ifadesinin sırrı budur.'],
      ['Cevizden biraz büyük parçalar kopar, yuvarla ve hafifçe bastır. Çatalla üzerine desen yap ya da kalıpla kes.', 'Hepsi aynı boyda olsun. Kayınvalide dizilişe bakacak, emin ol.'],
      ['Yağlı kâğıt serili tepsiye diz, üzerlerine yumurta sarısı sür, çörek otu ve susam serp.', 'Çörek otunu cömert serp. Kurabiyenin kimliği o.'],
      ['Önceden ısıtılmış 180°C fırında altları hafif kızarana kadar 20-25 dakika pişir.', 'Üstleri beyaz kalabilir, panik yapma. Bu kurabiye bronzlaşmayı sevmez.']
    ],
    ipucu: 'Hamuru bir gün önceden yoğurup streçe sarılı hâlde buzdolabında bekletebilirsin. Sabah şekil verip pişir, ev kurabiye kokar.',
    sorarlarsa: ['"İçinde margarin mi var?"', '"Tereyağı." Gururla söyle, hak ettin.']
  },
  {
    slug: 'pacanga-boregi', ad: 'Paçanga Böreği', kategori: 'borek', cizim: 'pacanga',
    spot: 'Pastırma, kaşar, çıtır yufka. Ara sıcakların sultanı; masaya geldiği an sohbet kısa bir süre durur.',
    rozet: 'Gösteriş modu', hazirlik: 20, pisirme: 15, porsiyon: '12 adet', zorluk: 'Orta, kızartma cesareti ister',
    karne: [
      ['Kayınvalide onayı', 5, 'Pastırmayı görünce eleştiri bölümü atlandı.'],
      ['Sohbeti durdurma gücü', 5, 'Sıcak sıcak gelince on saniye sessizlik garanti.'],
      ['Bütçe dostluğu', 1, 'Pastırma fiyatını sorma. Gösteriş ucuz değil.'],
      ['Tabakta kalma riski', 0, 'Kalan paçanga efsanedir, kimse görmedi.'],
      ['Kızartma kokusu', 4, 'Pencereyi aç, komşu da gelmek isteyebilir.']
    ],
    malzemeler: [
      ['3 adet', 'yufka'], ['150 g', 'ince dilim pastırma'], ['200 g', 'rendelenmiş kaşar'], ['2 adet', 'sivri biber'],
      ['1 adet', 'domates (çekirdekleri alınmış)'], ['1 yemek kaşığı', 'un + 2 yemek kaşığı su (yapıştırmak için)'], ['yeteri kadar', 'kızartmak için sıvı yağ']
    ],
    adimlar: [
      ['Biber ve domatesi küçük küpler hâlinde doğra. Pastırmayı şeritler hâlinde kes.', 'Pastırmayı keserken bir şerit sana. Şefin hakkıdır.'],
      ['Her yufkayı dört eşit üçgene böl.', 'Kenarları düzgün olmasa da olur. Kızarınca kimse bakmaz.'],
      ['Üçgenin geniş kenarına kaşar, pastırma, biber ve domates koy. Kenarları içe katlayıp sıkıca rulo yap; ucunu un-su karışımıyla yapıştır.', 'Sıkı sar. Gevşek sarılan paçanga yağda açılır ve itiraf eder.'],
      ['Kızgın yağda tüm yüzleri altın rengi olana kadar kızart, kâğıt havluya al.', 'Yağ yeterince sıcak değilse börek yağ çeker. Bir parça yufka atıp test et.'],
      ['Sıcak sıcak servis et.', 'Soğuyan paçanga, gün sonu dedikodusu gibidir: tadı kalır ama heyecanı gider.']
    ],
    ipucu: 'Böreklerini sabah sarıp üzeri örtülü olarak buzdolabında bekletebilirsin. Misafirler gelince kızart; tazeliği tartışılmaz olur.',
    sorarlarsa: ['"Bunu fırında yapsak olmaz mı?"', '"Olur, ama o zaman adı paçanga olmaz, pişmanlık olur."']
  },
  {
    slug: 'elmali-kurabiye', ad: 'Elmalı Kurabiye', kategori: 'kurabiye', cizim: 'elmali',
    spot: 'Tarçın kokusuyla misafiri kapıda karşılayan kurabiye. Ev bu kokuyu aldıysa, gün zaten başarılıdır.',
    rozet: 'Ev mis gibi kokar', hazirlik: 35, pisirme: 25, porsiyon: '30 adet', zorluk: 'Orta, şekil vermek sabır ister',
    karne: [
      ['Kayınvalide onayı', 5, '"Tarçını tam koymuşsun" dedi. Bu bir iltifattır.'],
      ['Kapıda karşılama gücü', 5, 'Koku ön kapıya kadar ulaşır, misafir gülümseyerek girer.'],
      ['Tarif sorulma ihtimali', 4, 'Hamuru ağızda dağılınca kesin soracaklar.'],
      ['Şekil verme sabrı', 2, 'Hilal yapmak dakikalar sürer. Bir kahve molası ver.'],
      ['Pudra şekeri kazası', 4, 'Siyah kazak giyme. Uyarmadı deme.']
    ],
    malzemeler: [
      ['125 g', 'tereyağı (oda sıcaklığında)'], ['½ su bardağı', 'sıvı yağ'], ['½ su bardağı', 'yoğurt'], ['½ su bardağı', 'pudra şekeri'],
      ['1 paket', 'kabartma tozu'], ['1 paket', 'vanilin'], ['3 su bardağı', 'un (aldığı kadar)'], ['3 adet', 'elma'],
      ['3 yemek kaşığı', 'toz şeker'], ['1 çay kaşığı', 'tarçın'], ['½ su bardağı', 'ceviz içi'], ['üzeri için', 'pudra şekeri']
    ],
    adimlar: [
      ['Elmaları kabuklarını soyup rendele. Toz şekerle birlikte tavada suyunu çekene kadar pişir. Tarçın ve kırılmış cevizi ekle, soğut.', 'İç harç tamamen soğumalı. Sıcak harç hamuru eritir, sen de sinir olursun.'],
      ['Tereyağı, sıvı yağ, yoğurt, pudra şekeri ve vanilini karıştır. Kabartma tozu ve unu azar azar ekleyerek yumuşak bir hamur yoğur.', 'Hamur ele yapışmıyorsa tamamdır. Yapışıyorsa biraz daha un; yapışmıyor ama kuruysa durmayı bil.'],
      ['Hamuru 3 parçaya böl. Her birini un serpilmiş tezgâhta yuvarlak aç ve pizza dilimi gibi 10 üçgene kes.', 'Merdaneyle açarken ortadan dışa doğru aç. Hayat tavsiyesi gibi duruyor ama değil.'],
      ['Her üçgenin geniş kenarına bir çay kaşığı harç koy, sar ve uçlarını hafifçe kıvırarak hilal şekli ver.', 'İlk beşi çirkin olur, onları sen yersin. Gerisi misafirlere.'],
      ['Önceden ısıtılmış 180°C fırında açık renk kalacak şekilde 20-25 dakika pişir. Ilıyınca pudra şekeri ele.', 'Sıcakken pudra şekeri dökersen erir. Ilıyınca dök, kar yağmış gibi dursun.']
    ],
    ipucu: 'Kurabiyeleri bir gün önceden pişirip kapalı kapta sakla, pudra şekerini servisten hemen önce ele. Tazelik görüntüsü tam puan alır.',
    sorarlarsa: ['"Margarin mi tereyağı mı?"', '"Tereyağı ve sevgi." Sevginin gramajını sorarlarsa konuyu değiştir.']
  }
];

tamTarifler.push(...require('./beyazyaka'));
tamTarifler.push(...require('./yeni-gun'));

// ---------- Mesai Mutfak'tan gelen gün klasikleri ----------
// [slug, ad, kategori, süre(dk), spot, rozet, onay, ipucu]
const mmHam = [
  ['mercimek-koftesi', 'Mercimek Köftesi', 'arasicak', 35, 'Gün tabağının değişmez kraliçesi. Bu yoksa gün sayılmaz, resmî kayıtlara geçmez.', 'Gün tabağının kraliçesi', 5, 'Marul yaprağı ve limon dilimi olmadan servis edilirse günün ciddiyeti tartışmaya açılır.'],
  ['ocaksiz-kisir', 'Kısır', 'meze', 20, 'Herkesin "benim annem böyle yapmıyordu" dediği, ama tabağını üç kez doldurduğu tarif.', 'Tartışma riski: yüksek', 4, 'Nar ekşisini masaya ayrıca koy; herkes kendi annesinin kısırına ulaşsın.'],
  ['sigara-boregi', 'Sigara Böreği', 'borek', 25, 'İnce, çıtır, tehlikeli. Tabaktan alınma hızı saniyede iki adettir.', 'En hızlı biten tabak', 5, 'Sabah sar, buzdolabında beklet, misafir gelince kızart. Sıcaklığı tartışılmaz olur.'],
  ['milfoy-borek', 'Peynirli Milföy Böreği', 'borek', 30, 'Hazır hamurun kat kat kabarıp seni zahmetli göstermesi. Zahmetli görünmek, gün sanatıdır.', 'Acil durum modu', 4, 'Üzerine yumurta sarısı sürmeyi unutma; parlaklık "pastaneden mi aldın" dedirtir.'],
  ['ispanakli-borek', 'Ispanaklı Börek', 'borek', 65, '"Diyetteyim" diyenin bile ikinci dilimi aldığı, vicdanı yeşil börek.', 'Diyetteyim diyene ikinci dilim', 4, 'Ispanağın suyunu iyice sık; sulu börek kimsenin gönlünü fethetmez.'],
  ['patatesli-kol-boregi', 'Patatesli Kol Böreği', 'borek', 70, 'Tepsiye sarmal dizilince bir sanat eseri gibi durur. Fotoğrafı yukarıdan çek.', 'Yukarıdan fotoğraflanır', 4, 'Bir gece önceden sarıp buzdolabında beklet; sabah sadece fırının düğmesine basarsın.'],
  ['gul-boregi', 'Gül Böreği', 'borek', 60, 'Adı romantik, kendisi doyurucu. Tepsiden çıkınca buket gibi görünür.', 'Göze girer, mideye girer', 4, 'Rulolar sıkı olsun; gevşek gül pişince açılır, bahar havası kaçar.'],
  ['su-boregi', 'Su Böreği', 'borek', 100, 'Gösteriş modunun en üst seviyesi. Bunu yapan gün sahibi, bir sonraki günün çıtasını yükseltir.', 'Gösteriş modu', 5, 'Yufkaları haşlarken ikinci bir kişi şart. Eşini mutfağa çağırmanın tam zamanı.'],
  ['peynirli-pogaca', 'Peynirli Poğaça', 'borek', 50, 'Pastane poğaçası, ev fiyatına. Çayın yanında "bir tane daha alayım" demeyi kolaylaştırır.', 'Çay demlenirken biter', 4, 'Ilık servis et; poğaça soğudukça sırları azalır.'],
  ['zeytinli-pogaca', 'Zeytinli Poğaça', 'borek', 55, 'Kekikli zeytin kokusuyla mutfağın en sevilen yorgunluğu.', 'Kokusu kapıda karşılar', 3, 'Zeytinleri kâğıt havluyla kurula; hamur kararmasın, poğaça kahverengi mutlu olsun.'],
  ['icli-kofte', 'İçli Köfte', 'arasicak', 80, 'Kaç tane yaptığını söyle, kaç saat uğraştığını söyleme. Sabrın tabağa konmuş hâli.', 'Gösteriş modu', 5, 'Kabuğu ince açmak için elini sık sık suya batır. İnce kabuk, büyük alkış.'],
  ['mantar-dolmasi', 'Mantar Dolması', 'arasicak', 30, 'Kaşarı uzayan, lokmalık, şık. "Bu çok emek istemiş" dedirtir, istememiştir.', 'Emek görünümlü kolaylık', 4, 'Mantarları servis anında fırından çıkar; uzayan kaşar sofraya şov getirir.'],
  ['rus-salatasi', 'Rus Salatası', 'meze', 40, 'Gün sofrasının nostaljik misafiri. Mayonezi gören hemen yanına ekmek arar.', 'Nostalji puanı yüksek', 4, 'Servis tabağına bombe şeklinde koy, üzerini turşuyla süsle. Seksenler geri döner.'],
  ['makarna-salatasi', 'Makarna Salatası', 'meze', 25, 'Kalabalık günün kurtarıcısı. Az malzeme, çok tabak, bol "çok güzel olmuş".', 'Kalabalık dostu', 4, 'Makarnayı haşladıktan sonra soğuk sudan geçir; yapışan makarna, yapışkan sohbet getirir.'],
  ['patates-salatasi', 'Patates Salatası', 'meze', 35, 'Limonlu, dereotlu, tartışmasız. Kimse itiraz etmez, herkes alır.', 'Tartışmasız klasik', 4, 'Patatesi sıcakken soslarsan lezzeti içine çeker; soğuyunca dereotunu ekle.'],
  ['haydari', 'Haydari', 'meze', 10, 'On dakikada biter, sofrayı meyhane şıklığına taşır. Gün sofrasında rakı yok ama havası var.', 'On dakikalık şıklık', 4, 'Üzerine bir tur zeytinyağı gezdir ve kuru nane serp; vitrin hazır.'],
  ['humus', 'Humus', 'meze', 10, 'Ortaya koy, yanına lavaş dizi. Misafirler kendini Beyrut\'ta sanar, sen İstanbul\'da çay demlersin.', 'Lavaşla dost', 3, 'Kaşığın arkasıyla ortada bir çukur aç, zeytinyağı ve pul biberi oraya koy.'],
  ['girit-ezmesi', 'Girit Ezmesi', 'meze', 10, 'Peynir, ceviz, fesleğen. Ege\'den gün sofrasına ışınlanmış bir meze.', 'Ege ışınlama', 4, 'Yanına grissini koy; herkes "bu ne şık" der, sen "hiç uğraşmadım" dersin.'],
  ['saksuka', 'Şakşuka', 'meze', 45, 'Kızarmış sebzenin domates sosuyla barıştığı, ekmeğe banılmak için doğmuş meze.', 'Ekmek bandırma garantili', 4, 'Bir gün önceden yap; şakşuka dinlendikçe karakter kazanır.'],
  ['visneli-nar-eksili-zeytinyagli-sarma', 'Vişneli Zeytinyağlı Sarma', 'zeytinyagli', 85, 'İnce sarmak zorundasın, herkes bakacak. Sarmanın kalınlığı gün sahibinin karnesidir.', 'İncelik testi', 5, 'Sarmaları servis tabağına dik ve sık diz; asker gibi dursunlar, gurur duy.'],
  ['zeytinyagli-lahana-dolmasi', 'Zeytinyağlı Lahana Sarması', 'zeytinyagli', 95, 'Kış günlerinin gösteriş sarması. Kuş üzümü ve dolmalık fıstık sohbeti tatlandırır.', 'Kış gösterişi', 4, 'Limon dilimleriyle servis et; lahana sarması limonsuz eksik kalır.'],
  ['zeytinyagli-pirasa', 'Zeytinyağlı Pırasa', 'zeytinyagli', 45, 'Pırasayı sevmeyenin bile "bu güzel olmuş" dediği, limonlu sürpriz.', 'Pırasa düşmanına ilaç', 3, 'Soğuk servis et ve bolca limon sık; pırasa limonla barışır.'],
  ['zeytinyagli-taze-fasulye', 'Zeytinyağlı Taze Fasulye', 'zeytinyagli', 60, 'Gün sofrasının ağırbaşlı büyüğü. Herkes saygı duyar, herkes biraz alır.', 'Ağırbaşlı klasik', 3, 'Bir gün önceden pişir; zeytinyağlılar ertesi gün daha olgun olur, insanlar gibi.'],
  ['revani', 'Revani', 'tatli', 50, 'Şerbet sıcak mı soğuk mu? Gün bu tartışmayla bile geçer. Biz kavgaya girmiyoruz.', 'Şerbet tartışması garantili', 4, 'Hindistan cevizini servisten hemen önce serp; nemlenmeden kar gibi dursun.'],
  ['islak-kek', 'Islak Kek', 'kurabiye', 50, 'Brownie\'nin Türk kuzeni. Kakaolu sosla ıslanır, misafirin gönlünü de ıslatır.', 'Çocuklar da gelirse kurtarıcı', 5, 'Sosun yarısını sıcak keke, yarısını servis anında dök; parlak görünür.'],
  ['yogurtlu-kek', 'Yoğurtlu Kek', 'kurabiye', 50, 'Limon kokulu, sade, iddiasız. Ama ilk biten o olur, iddiasız olanlar hep böyledir.', 'Sade ama etkili', 4, 'Kalıptan ılıyınca çıkar ve üzerine pudra şekeri ele; sadeliği şıklığa dönüşür.'],
  ['mozaik-pasta', 'Mozaik Pasta', 'tatli', 20, 'Çocukluğun fırınsız tatlısı. Dilimlendiğinde herkes bir an seksenlere gider.', 'Fırınsız nostalji', 4, 'Dondurucuda bir saat beklet, sonra dilimle; dilimler jilet gibi olur.'],
  ['magnolia', 'Magnolia', 'tatli', 25, 'Kupalarda servis edilen, "bunu kafeden mi aldın" dedirten tatlı.', 'Kafe havası', 4, 'Şeffaf bardaklarda servis et; katmanlar görünsün, alkış gelsin.'],
  ['tiramisu-toplari', 'Tiramisu Topları', 'tatli', 25, 'Lokmalık, kakaolu, tehlikeli. Tabağa koyduğunu say, sonra saymayı bırak.', 'Lokmalık tehlike', 4, 'Mini kek kâğıtlarına koyarak servis et; elden ele şık dolaşsın.'],
  ['profiterol', 'Profiterol', 'tatli', 70, 'Masaya geldiği an sohbet durur. Hedef de buydu zaten.', 'Sohbeti durdurur', 5, 'Çikolata sosunu servisten hemen önce sıcak dök; buhar fotoğrafta efsane durur.'],
  ['sekerpare', 'Şekerpare', 'tatli', 55, 'Bayram tatlısı, gün sofrasına terfi etti. Şerbetli ama ağırbaşlı.', 'Bayram havası', 4, 'Soğuk şerbeti sıcak tatlıya dök; şekerpare şerbeti içsin, sen de çayını iç.'],
  ['supangle', 'Supangle', 'tatli', 25, 'Kupada yoğun kakao keyfi. Kimse diyet konuşmaz, herkes kaşığını yalar.', 'Kaşık yalatan', 4, 'Üzerine Hindistan cevizi ya da fındık serp; kupalar fotoğrafa hazır.'],
  ['kalpli-kurabiye', 'Kalpli Kurabiye', 'kurabiye', 45, 'Ortasında reçel, kenarında sevgi. Gün sahibi olarak verdiğin en tatlı mesaj.', 'Sevgi gösterisi', 4, 'Reçeli pişirmeden önce koy; parlaklığı vitrin kalitesinde olur.'],
  ['acibadem-kurabiyesi', 'Acıbadem Kurabiyesi', 'kurabiye', 30, 'Unsuz, çıtır, zarif. Glutensiz misafirin seni hayatı boyunca hatırlamasını sağlar.', 'Glutensiz dost', 4, 'Pişince tepside soğumaya bırak; sıcakken kaldırırsan kırılır, kalbin de.'],

  // --- Kasım 2026 çeşitlendirme (Mesai Mutfak) ---
  ['fava', 'Fava', 'meze', 55, 'Pürüzsüz, sakin, dereotlu. Kısırın gürültüsüne karşı tabağın meditasyon köşesi.', 'Sofranın zen köşesi', 5, 'Kalıba dökülüp ters çevrilmiş fava, üstüne kırmızı soğan halkası: tabak kendini anlatır.'],
  ['muhammara', 'Muhammara', 'meze', 30, 'Ceviz, kapya, nar ekşisi. Tadına bakan herkes "bu ne, bunu nereden buldun" sorusunu sorar.', 'Soru işareti mezesi', 4, 'Yanına lavaş cipsi koy; kaşıkla yiyenler de olacak, yargılama.'],
  ['atom', 'Atom', 'meze', 8, 'Adı kadar etkili: süzme yoğurt, kuru acı biber, kızgın tereyağı. Acı sevenlerin gizli buluşma noktası.', 'Acı sevene', 4, 'Tereyağını servis anında dök; cızırtı sesi sofradaki ilk alkıştır.'],
  ['kozlenmis-patlican-salatasi', 'Közlenmiş Patlıcan Salatası', 'meze', 30, 'Ev közün kokusuyla dolar, komşu "mangal mı yaktınız" diye kapıyı çalar.', 'Köz kokulu', 4, 'Patlıcanı ocakta közle, kısa süre poşette beklet; kabuğu kendiliğinden soyulur.'],
  ['yogurtlu-kabak', 'Yoğurtlu Kabak Mezesi', 'meze', 18, 'Sotelenmiş kabak, sarımsaklı yoğurt, dereotu. Hızlı, hafif, her zaman kurtarıcı.', 'On sekiz dakikalık kurtarıcı', 4, 'Kabağın suyunu iyice sık; sulu meze, sulu sohbet getirir.'],
  ['pancar-salatasi', 'Pancar Salatası', 'meze', 50, 'Mor renkli, sirkeli, sarımsaklı. Beyaz tabakta sofranın renk ustası.', 'Renk ustası', 4, 'Pancarı eldivenle doğra; oje rengin değişmesin.'],
  ['zeytinyagli-biber-dolmasi', 'Zeytinyağlı Biber Dolması', 'zeytinyagli', 70, 'Kuş üzümlü, fıstıklı iç. Gün sahibinin "ben gerçekten uğraştım" belgesi.', 'Emek belgesi', 5, 'Bir gün önce yap, tencerede soğusun; ertesi gün iç pilav tam kıvamını bulur.'],
  ['zeytinyagli-barbunya', 'Zeytinyağlı Barbunya', 'zeytinyagli', 75, 'Havuçlu, patatesli, limonlu. Mütevazı ama doyurucu; gün sofrasının sağlam dostu.', 'Sağlam dost', 4, 'Servis ederken üzerine bol maydanoz ve bir limon dilimi; renk geri gelir.'],
  ['zeytinyagli-kereviz', 'Zeytinyağlı Kereviz', 'zeytinyagli', 50, 'Portakallı, havuçlu, bezelyeli. Kışın sofraya gelen ferah bir nefes.', 'Kış ferahlığı', 4, 'Kerevizi doğrar doğramaz limonlu suya at; kararmaz, tabak parlar.'],
  ['zeytinyagli-enginar', 'Zeytinyağlı Enginar', 'zeytinyagli', 55, 'Enginar çanağında bezelye ve havuç. Sofraya gelince "bu ne zarif" denir.', 'Zarafet tabağı', 5, 'Hazır temizlenmiş enginar al; zahmeti senin değil, zarafeti senin.'],
  ['mucver', 'Kabak Mücveri', 'arasicak', 30, 'Dereotlu, peynirli, kenarları çıtır. Yoğurt kasesiyle birlikte gelirse misafir oturduğu yerden kalkmaz.', 'Yoğurt eşliğinde', 4, 'Rendelenmiş kabağın suyunu sık, hamur cıvık olmasın; airfryer da iş görür.'],
  ['patates-koftesi', 'Patates Köftesi', 'arasicak', 40, 'Kaşarlı, maydanozlu, galeta unlu. Çocukların ve büyüklerin ortak noktası.', 'Barış elçisi', 4, 'Köfteleri şekillendirip 30 dakika buzdolabında beklet; kızartırken dağılmaz.'],
  ['puf-boregi', 'Puf Böreği', 'borek', 50, 'Kızgın yağda balon gibi kabaran peynirli yarım aylar. Hafif görünür, sayısı ağır gelir.', 'Balon etkisi', 4, 'Kenarlarını çatalla bastır; peynir kaçarsa yağ sıçrar, morallerin de.'],
  ['un-kurabiyesi', 'Un Kurabiyesi', 'kurabiye', 40, 'Ağızda dağılan, pudra şekerli, nostaljik. Herkesin anneannesinin gizli tarifi.', 'Anneanne klasiği', 5, 'Pişince kesinlikle sıcakken dokunma; soğuyunca pudra şekerine bula.'],
  ['tahinli-kurabiye', 'Tahinli Kurabiye', 'kurabiye', 30, 'Kıyır kıyır, susamlı, tarçınlı. Çay bardağının yanında kendine yer açar.', 'Çay yoldaşı', 4, 'Tahini iyice karıştırıp kullan; dibe çöken yağ kıvamı değiştirir.'],
  ['havuclu-tarcinli-kek', 'Havuçlu Tarçınlı Kek', 'kurabiye', 65, 'Nemli, cevizli, tarçın kokulu. Ev, misafirden önce mis gibi kokar.', 'Ev kokusu', 4, 'Havucu ince rendele; kekin her lokmasına eşit dağılsın.'],
  ['trilece', 'Trileçe', 'tatli', 50, 'Üç sütle ıslanmış kek, karamel sos. Balkanlardan gelip gün sofrasına yerleşmiş, gitmeye niyeti yok.', 'Gitmeyen misafir', 5, 'Bir gece önce yap; sütü tamamen çeksin, karamel servis anında.'],
  ['firinda-sutlac', 'Fırında Sütlaç', 'tatli', 60, 'Üstü kızarık, kenarı karamelize. Şerbetli tatlı istemeyenin sığınağı.', 'Şerbet istemeyene', 4, 'Kaselerde servis et, üstüne tarçını misafir koysun; herkesin tarçın politikası farklı.'],
  ['kemalpasa', 'Kemalpaşa Tatlısı', 'tatli', 55, 'Şerbetli, peynirli küçük toplar, yanında kaymak. Lokmalık ama ağırbaşlı.', 'Kaymak eşliğinde', 4, 'Şerbetini tuzlu tabaklardan uzak tut; peynirli toplar şerbeti cömertçe paylaşır.'],
  ['gullac', 'Güllaç', 'tatli', 35, 'Gül suyu kokulu sütte yumuşayan ince yapraklar, ceviz ve nar. Hafif, zarif, fotoğrafta efsane.', 'Hafif ve zarif', 5, 'Üzerine nar tanelerini servisten hemen önce serp; kırmızı-beyaz kontrast tabağı taşır.'],
  ['kadayif-dolmasi', 'Kadayıf Dolması', 'tatli', 65, 'Cevizle sarılmış çıtır kadayıf ruloları. Bayram sofrasından gün sofrasına terfi.', 'Bayram terfisi', 4, 'Soğuk şerbeti sıcak kadayıfa dök; çıtırlık ancak böyle korunur.'],
  ['kabak-tatlisi', 'Kabak Tatlısı', 'tatli', 60, 'Kendi suyunda pişen balkabağı, tahin ve ceviz. Kasımın en turuncu tatlısı.', 'Mevsimin turuncusu', 4, 'Tahini üstüne ince ince gezdir, cevizi iri kır; tabak hem rustik hem şık.'],
  ['biskuvili-pasta', 'Bisküvili Pasta', 'tatli', 35, 'Fırınsız, muhallebili, kat kat. Son dakika panik durumunun en sevimli çözümü.', 'Son dakika kurtarıcısı', 4, 'Bisküviyi süte hızlıca batır çıkar; bekletirsen pasta değil lapa olur.'],
  ['kis', 'Kiş', 'beyazyaka', 70, 'Tereyağlı tart hamurunda yumurtalı, kremalı dolgu. Börek değil, kiş. Fark büyük, unvan büyük.', 'Börek değil, kiş', 4, 'Mini tart kalıplarında yaparsan her misafire bir kiş; porsiyon pazarlığı biter.'],
  ['bruschetta', 'Bruschetta', 'beyazyaka', 15, 'Kızarmış ekmek, domates, sarımsak, fesleğen. İtalyan bir aperatif, gün sofrasında sıcak karşılandı.', 'İtalyan aperatif', 4, 'Domatesi servisten hemen önce koy; ekmek ıslanmadan çıtır kalsın.'],
  ['caprese-salata', 'Caprese Salata', 'beyazyaka', 10, 'Domates, mozzarella, fesleğen. On dakikada İtalya, sıfır ocak.', 'On dakikada İtalya', 4, 'Kürdanlara dizip mini şiş yaparsan ayakta da yenir.'],
  ['san-sebastian-cheesecake', 'San Sebastian Cheesecake', 'beyazyaka', 65, 'Üstü yanık, içi kremamsı. "Yanmış mı bu?" sorusuna "kasıtlı" cevabı verilir.', 'Kasıtlı yanık', 5, 'Bir gece buzdolabında dinlendir; dilimler düzgün, içi kadife olur.'],
  ['dubai-cikolatasi', 'Dubai Çikolatası', 'beyazyaka', 40, 'Kavrulmuş kadayıf, fıstık kreması, çikolata. Kırıldığında çıtırtısı videoya girer.', 'Viral çıtırtı', 5, 'Küçük kareler hâlinde kes; pahalı malzeme küçük porsiyonda daha kıymetli durur.'],
  ['hurmali-enerji-toplari', 'Hurmalı Enerji Topları', 'beyazyaka', 15, 'Hurma, yulaf, kuruyemiş. Şekersiz, fırınsız, vegan. Sağlıklı tabakların yıldızı.', 'Fırınsız vegan', 4, 'Bir kısmını hindistan cevizine, bir kısmını kakaoya bula; iki renk, tek emek.'],
  ['yogurtlu-meyveli-parfe', 'Yoğurtlu Meyveli Parfe', 'beyazyaka', 10, 'Süzme yoğurt, granola, mevsim meyvesi, kat kat bardakta. Brunch hissi, on dakikada.', 'Brunch hissi', 4, 'Granolayı servisten hemen önce ekle; yumuşarsa çıtırtı gider.']
];

// Mesai Mutfak klasikleri: Gün Tabağı üslubuyla tam tarif (ölçü + adım); MM'ye küçük link kalır
const mmTam = Object.assign({}, require('./mm-tam-1'), require('./mm-tam-2'), require('./mm-tam-3'), require('./mm-tam-4'));
const cizimKat = { borek: 'borek', meze: 'brokoli', arasicak: 'pacanga', zeytinyagli: 'havuc', tatli: 'tiramisu', kurabiye: 'kurabiye', beyazyaka: 'brokoli' };
const mmTarifler = [];
mmHam.forEach(([slug, ad, kategori, sure, spot, rozet, onay, ipucu]) => {
  const d = mmTam[slug];
  if (!d) { mmTarifler.push({ slug, ad, kategori, sure, spot, rozet, onay, ipucu, tip: 'mm', mmUrl: MM(slug), img: MMIMG(slug) }); return; }
  tamTarifler.push({
    slug, ad, kategori, cizim: cizimKat[kategori], spot, rozet, hazirlik: d.h, pisirme: d.p, porsiyon: d.po, zorluk: d.z,
    karne: d.k, malzemeler: d.m.map((x) => x.split('|')), adimlar: d.a, ipucu, sorarlarsa: d.s, mmUrl: MM(slug), mmImg: MMIMG(slug)
  });
});

tamTarifler.forEach((t) => {
  t.tip = 'tam';
  t.sure = t.hazirlik + t.pisirme;
  t.onay = t.karne[0][1];
  const jpg = require('path').join(__dirname, 'static', 'img', 'tarifler', `${t.slug}.jpg`);
  t.img = require('fs').existsSync(jpg) ? `/img/tarifler/${t.slug}.jpg` : (t.mmImg || `/img/tarifler/${t.slug}.svg`);
});

const tumTarifler = [...tamTarifler, ...mmTarifler];

const beyazYakaSecki = ['mascarponeli-tiramisu-kuplari', 'narli-kisir', 'hellimli-narli-mini-sis', 'fume-somonlu-mini-pankek', 'pancarli-humus-kuplari', 'fistikli-kadayifli-cheesecake-kuplari', 'balkabakli-burrata-salatasi', 'keci-peynirli-balli-mini-borek'];

const haftaninTabagi = ['patatesli-milfoy-borek', 'yalanci-tiramisu', 'ocaksiz-kisir', 'mercimek-koftesi', 'havuc-tarator', 'pacanga-boregi'];

const sozluk = [
  ['Zahmet etmeseydin', 'Etmeseydin gerçekten, ben diyete başlamıştım.'],
  ['Ben bir şey yapmadım ki', 'Sabah altıdan beri mutfaktayım, ayaklarımı hissetmiyorum.'],
  ['Tarifini verir misin?', 'Ben de yapacağım ve benimki daha güzel olacak.'],
  ['Ben sadece çay içeceğim', 'Tabağın yarısı benim, haberin olsun.'],
  ['Hiç uğraşmadım, hazır yufka', 'Yalan. Ama güzel yalan, saygı duyulur.'],
  ['Bir dahakine bende', 'Şimdiden gerildim, menüyü bu akşam düşünmeye başlıyorum.'],
  ['Çok güzel olmuş, eline sağlık', '(Tek lokmadan sonra söylendiyse) Bir dahakine börek getir.'],
  ['Ay ben bu kadar yiyemem', 'Bir tabak daha koy, kimse bakmıyorken alırım.'],
  ['Biz kalkalım artık', 'Bir saat daha oturacağız, çayları tazele.'],
  ['Sen hiç değişmemişsin', 'Ben senin değiştiğini fark ettim, sonra konuşuruz.'],
  ['Kızım bu çok hafif olmuş', 'Az tuz koymuşsun. Söylemedim deme.'],
  ['Yarısını paket yapayım mı sana?', 'Lütfen evet de, buzdolabımda yer yok.']
];

const sunum = [
  'Ortaya bir dal maydanoz koy. Profesyonel görünürsün, kimse sorgulamaz.',
  'Üç çeşit varsa zengin, beş çeşit varsa gösteriş, yedi çeşit varsa kayınvalide geliyordur.',
  'Kurabiyeleri çapraz diz. Sayısı az görünmez, "yetmez mi acaba" stresi biter.',
  'Tabak kenarını kâğıt havluyla sil. Fark yaratan detay budur, çeyiz takımı kadar önemlidir.',
  'Tatlıyı en son, en iyi tabakta çıkar. Final sahnesi gibi düşün, alkış oradan gelir.',
  'Kısırı yuvarlak kaseyle şekillendirip tabağa ters çevir. Basit hile, büyük etki.'
];

const menuler = {
  dun: ['patatesli-milfoy-borek', 'yalanci-tiramisu', 'ocaksiz-kisir', 'haydari'],
  gun: ['ispanakli-borek', 'mercimek-koftesi', 'havuc-tarator', 'etimek-tatlisi'],
  hafta: ['su-boregi', 'icli-kofte', 'visneli-nar-eksili-zeytinyagli-sarma', 'profiterol'],
  plaza: ['keci-peynirli-balli-mini-borek', 'narli-kisir', 'avokadolu-humuslu-crostini', 'mascarponeli-tiramisu-kuplari']
};

module.exports = { beyazYakaSecki, kategoriler, tamTarifler, mmTarifler, tumTarifler, haftaninTabagi, sozluk, sunum, menuler };
