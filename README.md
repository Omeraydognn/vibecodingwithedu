# VibeCoding + Learn

Vibe coding yaparken (AI'a prompt yazıp devam ede basarken) kara kutu sendromuna düşmeden,
her komutta hem projenin **domain'i** hem de kullanılan **yazılım tekniği** hakkında küçük bir
şey öğrenmeni sağlayan, IDE'den bağımsız evrensel bir kural dosyası.

## Kural: Bir kere kur, sonra sadece sohbet et

Her iki kullanım şeklinde de terminal komutu yazmıyorsun, dosya tekrar yüklemiyorsun. Tek
seferlik bir kurulum yapıyorsun, sonrasında hep normal sohbet penceresinden devam ediyorsun.

### A) IDE-içi AI sohbeti kullanıyorsan (Cursor, Windsurf, Copilot Chat, Claude Code)

Bu araçlar proje kökündeki kural dosyasını **her mesajda otomatik** okur — hiçbir ek adım yok.

1. [`vibecoding.md`](vibecoding.md) dosyasını projenin köküne kopyala.
2. Aracın beklediği isme göre kopyala/yeniden adlandır (bazıları özel isim ister):
   - Claude Code → `CLAUDE.md`
   - Cursor → `.cursor/rules` (veya `.cursorrules`)
   - Windsurf → `.windsurfrules`
   - GitHub Copilot Chat → `.github/copilot-instructions.md`
3. Dosyanın en üstündeki `DOMAIN`, `DOMAIN_UZMANLIK_ROLÜ`, `GELİŞTİRİCİ_SEVİYESİ` alanlarını doldur
   (boş bırakırsan AI ilk mesajda sorar).
4. Sohbet penceresine yazmaya başla. Ekstra hiçbir şey yapmana gerek yok.

### B) Web uygulaması kullanıyorsan (ChatGPT, Claude.ai, Gemini)

Bu uygulamalarda dosya **attachment olarak yüklemek kalıcı değildir** — bir süre sonra kurallar
unutulur. Bunun yerine platformun kalıcı talimat özelliğini kullan (tek seferlik kurulum):

1. **Claude.ai** → yeni bir **Project** oluştur → "Custom instructions" alanına `vibecoding.md`
   içeriğini yapıştır.
2. **ChatGPT** → yeni bir **Project** veya **Custom GPT** oluştur → "Instructions" alanına yapıştır.
3. **Gemini** → yeni bir **Gem** oluştur → sistem talimatı alanına yapıştır.
4. Domain alanlarını doldur, kaydet.
5. O Project/GPT/Gem içinde açtığın **her yeni sohbette** kurallar otomatik uygulanır — bir daha
   dosya yükleme veya yapıştırma yapmana gerek kalmaz.

Kodlamaya başla — AI her cevabında `Durum → Kod → Mikro-Ders → Sıradaki Kanca` formatını
kullanacak ve projenin fazına göre öğretim derinliğini kendi ayarlayacak.

AI, öğrettiği kavramları tekrar etmemek için proje kökünde `vibecoding-log.md` adlı bir defter
dosyası oluşturup güncelleyecektir — bunu silme, sistemin hafızasıdır.

## Neden

Detaylı tasarım gerekçesi ve mimari tartışma için bkz. proje kararlarının dayandığı sohbet:
https://gemini.google.com/share/d216c7bf7460
