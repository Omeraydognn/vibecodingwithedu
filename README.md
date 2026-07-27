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
ChatGPT, Claude.ai, Gemini, hangisi olursa) okuyup uyduğu bir kural dosyası. Bu dosyayı okuyan
AI, kod yazmaya devam eder ama **her cevabında** seni iki konuda mikro-doz bilgiyle besler:

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

Kullandığın araca göre iki farklı yol var. **İkisinde de kurulum tek seferlik** — sonrasında
tamamen normal sohbetten devam edersin.

### A) IDE-içi AI sohbeti (Cursor, Windsurf, Copilot Chat, Claude Code)

Bu araçlar proje kökündeki kural dosyasını **her mesajda otomatik** okur.

1. [`vibecoding.md`](vibecoding.md) dosyasını projenin kök dizinine kopyala.
2. Kullandığın aracın beklediği dosya adına göre yeniden adlandır:

   | Araç | Dosya adı |
   |---|---|
   | Claude Code | `CLAUDE.md` |
   | Cursor | `.cursor/rules` (veya `.cursorrules`) |
   | Windsurf | `.windsurfrules` |
   | GitHub Copilot Chat | `.github/copilot-instructions.md` |

3. Dosyanın en üstündeki `DOMAIN`, `DOMAIN_UZMANLIK_ROLÜ`, `GELİŞTİRİCİ_SEVİYESİ` alanlarını
   doldur (boş bırakırsan AI ilk mesajda sana sorar, sen de sohbetten cevap verirsin).
4. Yeni bir oturum/sohbet başlat (dosyayı sohbet zaten açıkken eklediysen, dosya o oturuma
   yansımaz — kapatıp yeniden aç) ve normal şekilde kod yazdırmaya başla.

### B) Web uygulaması (ChatGPT, Claude.ai, Gemini)

Bu uygulamalarda dosyayı sohbete **attachment olarak yüklemek kalıcı değildir** — birkaç mesaj
sonra kurallar unutulur. Bunun yerine platformun kalıcı talimat özelliğini kullan:

1. **Claude.ai** → yeni bir **Project** oluştur → "Custom instructions" alanına
   `vibecoding.md` içeriğini yapıştır.
2. **ChatGPT** → yeni bir **Project** ya da **Custom GPT** oluştur → "Instructions" alanına
   yapıştır.
3. **Gemini** → yeni bir **Gem** oluştur → sistem talimatı alanına yapıştır.
4. Domain alanlarını doldur, kaydet.
5. O Project/GPT/Gem içinde açtığın her yeni sohbette kurallar otomatik uygulanır — bir daha
   dosya yükleme veya yapıştırma yapmana gerek kalmaz.

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
- Web uygulamalarında Project/Custom GPT/Gem gibi kalıcı talimat özelliği olmayan sade bir
  sohbet penceresinde (örn. hesap açmadan kullanılan demo sohbetler) kalıcılık garanti edilemez.

## Neden bu şekilde tasarlandı

Mimari kararların tam gerekçesi ve tartışması için: https://gemini.google.com/share/d216c7bf7460
