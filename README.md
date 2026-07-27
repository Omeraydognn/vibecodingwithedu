# VibeCoding + Learn

**AI ile kod yazarken, aynı zamanda gerçekten bir şeyler öğrenmeni sağlayan, IDE'den bağımsız,
tek dosyalık evrensel bir kural sistemi.**

---

## Sorun

"Vibe coding" hızlı: prompt yazıyorsun, AI kodu üretiyor, sen çalıştırıp devam ediyorsun. Ama bu
hız bir bedelle geliyor — **kara kutu sendromu**. Ne yazıldığını, neden o kütüphanenin/deseninin
seçildiğini, üzerinde çalıştığın alanın (kuantum, blockchain, finans, ne ise) mantığının ne
olduğunu hiç öğrenmeden onlarca dosya biriktiriyorsun. Öğrenmeye gerek duymadığın için de çaba
sarf etmiyorsun — ve zamanla refleksler körelmeye başlıyor.

## Çözüm

`vibecoding.md`, projenin köküne koyduğun ve AI asistanının (Claude Code, Cursor, Windsurf,
Copilot Chat, hangisi olursa) okuyup uyduğu bir kural dosyası. Bu dosyayı okuyan AI, kod
yazmaya devam eder ama **her cevabında** seni iki konuda mikro-doz bilgiyle besler:

- 🧠 **Domain bilgisi** — üzerinde çalıştığın alanın mantığı (fizik, iş kuralı, protokol, ne ise)
- 💻 **Yazılım/mimari bilgisi** — neden o dil/kütüphane/pattern seçildi, hangi mühendislik
  prensibi uygulandı

Kurulum dışında hiçbir ekstra adım yok. Terminale komut yazmıyorsun, dosya tekrar yüklemiyorsun.
Normal sohbetine devam ediyorsun, öğrenme kendiliğinden akıyor.

## Nasıl çalışıyor (özet)

| Mekanizma | Ne yapar |
|---|---|
| **Çift Şapka** | AI her cevapta hem Alan Uzmanı hem Kıdemli Yazılımcı gibi davranır. |
| **Faz Algılama** | Proje küçükken büyük resmi, büyüdükçe daha ileri detayları öğretir — seni bilgiyle boğmaz. |
| **Mikro-Doz Kuralı** | Her cevapta tam olarak 1 domain + 1 yazılım kavramı, maksimum 3 cümle. |
| **Tech Kavramı Testi** | Yazılım dersi kod özeti değildir — her zaman isimlendirilmiş, transfer edilebilir bir mühendislik prensibidir (örn. *Data Leakage Prevention*, *Idempotency*). |
| **Analoji / Scaffolding** | Her yeni kavram gerçek dünyadan bir benzetmeyle ya da projede daha önce öğrenilen bir şeyle bağlanır. |
| **Öğrenme Geçmişi** | AI, `vibecoding-log.md` dosyasına öğrettiklerini kaydeder ve aynı şeyi iki kere anlatmaz. |
| **Kişisel Odak** | İlk komutta "domain mi, yazılım mı, dengeli mi, yoksa belirli bir konu mu?" diye sorar ve ona göre ağırlıklandırır. |
| **Sabit Sohbet Formatı** | Her cevap `Durum → Kod → Mikro-Ders → Sıradaki Kanca` bloklarından oluşur — kod içine yorum satırı yazılmaz, her şey sohbette kalır. |

Tüm kuralların tam metni ve gerekçeleri için: [`vibecoding.md`](vibecoding.md).

## Örnek çıktı

```
### Durum
2 qubit'lik bir Bell state devresi eklendi.

### Kod
<kod bloğu>

### Mikro-Ders
**Domain:** Hadamard kapısı bir qubit'i süperpozisyona sokar — yazı tura havadayken hem yazı
hem tura olması gibi. CNOT kapısı bu iki qubit'i dolanık hale getirir, biri ölçülünce diğeri
anında belirlenir.

**Tech — Idempotency:** Bir işlemi birden fazla kez çalıştırmak, bir kez çalıştırmakla aynı
sonucu vermelidir — tekrar denenen bir ödeme isteğinin iki kez para çekmemesi gibi. Burada
devre kurulum fonksiyonu her çağrıldığında state'i sıfırdan kurduğu için tekrar çağrılması
güvenlidir (circuit.py:12).

### Sıradaki Kanca
Bu devreye üçüncü bir qubit eklesek, dolanıklık nasıl değişir?
```

---

## Kurulum

### 1) Dosyayı projenin kök dizinine kopyala

[`vibecoding.md`](vibecoding.md) dosyasını olduğu isimle projenin kök dizinine koy. **Yeniden
adlandırmana gerek yok** — hangi AI aracını kullanırsan kullan aşağıdaki yöntem çalışır.

### 2) Yeni bir sohbet başlat ve açılış promptunu yapıştır (garantili yöntem)

Bazı araçlar (Claude Code → `CLAUDE.md`, Cursor → `.cursorrules` gibi) belirli dosya adlarını
otomatik okur, ama bu isimlendirme her araçta geçerli değil ve garanti de değil. Hangi AI/araç
olursa olsun çalışan tek yöntem şu: **her yeni sohbetin ilk mesajı olarak** bu promptu yapıştır.

```
Bu projenin kök dizininde vibecoding.md adlı bir kural dosyası var. Şimdi o dosyayı oku.
Bundan sonra bu sohbetin tamamında — kaç mesaj sürerse sürsün, ne kadar büyük veya çok adımlı
bir görev olursa olsun — o dosyadaki tüm kurallara harfiyen uy. Özellikle Bölüm 6'daki sohbet
çıktı şemasını (Durum / Kod / Mikro-Ders / Sıradaki Kanca) her kod yazdığında kullan. Domain
alanları (DOMAIN, DOMAIN_UZMANLIK_ROLÜ, ODAK_TERCİHİ) boşsa önce bana sor, doldurunca devam et.
```

Bu, dosyayı "okuma+talimat takip etme" AI'ların temel yeteneği olduğu için isim tanımasa bile
çalışır. Domain sorularını cevapladıktan sonra normal şekilde kod yazdırmaya başlayabilirsin.

### (Opsiyonel) Otomatik okuma için dosya adını değiştir

Aracın kendi kural-dosyası isimlendirmesini kullanmak, açılış promptunu her seferinde
yapıştırma zahmetinden kurtarır:

| Araç | Dosya adı |
|---|---|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules` (veya `.cursorrules`) |
| Windsurf | `.windsurfrules` |
| GitHub Copilot Chat | `.github/copilot-instructions.md` |

Bu isimlerden birini kullanırsan araç dosyayı sohbet başında kendiliğinden okur, açılış
promptuna gerek kalmaz — ama dosyayı sohbet zaten açıkken eklediysen yine de **yeni bir
oturum** başlatman gerekir, mevcut oturuma yansımaz.

## Kurulumdan sonra

- AI, öğrettiği kavramları tekrar etmemek için proje kökünde `vibecoding-log.md` adlı bir
  defter dosyası oluşturup güncelleyecek — bunu silme, sistemin hafızasıdır.
- İstediğin zaman sohbette **"odağı X yap"** diyerek neyi öğrenmek istediğini değiştirebilirsin
  (örn. "odağı gas optimizasyonuna çevir").
- "Öğretmeyi kes" dersen AI bu dosyayı görmezden gelip normal bir asistan gibi davranmaya döner.

## Sınırlamalar

- Kurallar bir sistem promptu gibi davranır ama garanti değildir — çok büyük/çok adımlı otonom
  görevlerde (örn. onlarca dosyayı tek seferde değiştirip commit atan bir görev) format zaman
  zaman zayıflayabilir. Küçük, tek adımlı promptlarda en güvenilir sonucu verir.
