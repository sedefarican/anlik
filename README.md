# 📰 ANLIK Haber Uygulaması | Kullanım Kılavuzu

ANLIK, kullanıcıların ilgi alanlarına göre özelleştirilmiş haber akışlarını takip edebilecekleri, Node.js ve React ile geliştirilmiş modern bir web uygulamasıdır.

## Proje Özellikleri

-  Kullanıcı kaydı ve JWT tabanlı kimlik doğrulama (Node.js & MongoDB)
-  İlgi alanlarına göre kategori seçimi ve filtreleme
-  Seçilen kategorilere göre kişiselleştirilmiş haber akışı
-  NewsAPI.org entegrasyonu ile gerçek zamanlı haberler
-  Tema değiştirme (karanlık/açık mod desteği)
-  Mobil uyumlu responsive tasarım
-  Ana sayfaya dönme, önerilen kategoriye gitme, kullanıcı profil ekranı
-  Giriş/Kayıt/Şifremi Unuttum ekranları modern ve sade tasarımlı

##  Kullanılan Teknolojiler

###  Backend (Node.js)
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Dotenv

###  Frontend (React)
- React Router v6
- Context API / useState
- Custom Components (Header, Footer, CategoryBar, Layout)
- Responsive CSS (Inline style + media query)

**ANLIK**, seni ilgilendiren haberleri süzerek önüne getiren kişiselleştirilebilir bir haber platformudur. Aşağıdaki adımlarla uygulamayı verimli şekilde kullanabilirsin:

## 🔐 1. Giriş Yap veya Kayıt Ol

- Siteye girdiğinde ilk olarak **Giriş Yap** ekranı seni karşılar.
- Hesabın yoksa **"Kayıt Ol"** bağlantısına tıklayarak e-posta ve şifren ile ücretsiz hesap oluşturabilirsin.
- Şifreni unuttuysan, **"Şifremi Unuttum"** bağlantısıyla şifre sıfırlama ekranına geçebilirsin (devamı planlanıyor).

---

## 🏠 2. Dashboard (Ana Sayfa)

- Giriş yaptıktan sonra doğrudan **Dashboard ekranına** yönlendirilirsin.
- Burada, seni bekleyen güncel haberleri görebilir, hangi konulara ilgi duyduğunu belirleyebilirsin.

---

## 🧷 3. Kategori Seçimi

- Sayfanın üst kısmında yer alan kutucuklardan ilgini çeken kategorileri (örneğin Teknoloji, Spor, Bilim...) **seçebilirsin.**
- Seçtiğin kategorilere göre sadece o alanlardaki haberler ekrana gelir.
- Filtreyi değiştirmek için istediğin kutuların seçimini kaldırabilir veya yenilerini işaretleyebilirsin.

---

## 🧠 4. Kişiselleştirme & En Senlik Kategori

- Sistem senin tıklama alışkanlıklarını takip eder.
- En sık ilgilendiğin kategori, sayfanın üst kısmındaki **“En senlik kategori”** butonunda önerilir.
- Bu butona tıkladığında doğrudan o kategoriye ait haberlerin bulunduğu özel sayfaya yönlendirilirsin.
- O sayfadan istersen tek tuşla **ana sayfaya geri dönebilirsin.**

---

## 🌓 5. Tema Değiştirme

- Sağ üstte yer alan 🌗 simgesiyle görünümü **karanlık mod** veya **açık mod** olarak değiştirebilirsin.
- Tema tercihin, tarayıcında otomatik olarak saklanır.

---

## 📰 6. Haberlere Göz Atma

- Her haber kartında başlık, açıklama ve görsel yer alır.
- **"Habere Git"** butonuna tıkladığında, o haberi yayınlayan asıl haber sitesine yönlendirilirsin.
- Böylece uygulama seni sadece yönlendirir, kaynağa ulaşmanı sağlar.

---

## 👤 7. Kullanıcı Sayfası (İsteğe Bağlı)

- Sağ üstteki 👤 ikonuna tıklayarak profil sayfana geçebilirsin.
- Buradan ileride şifre değiştirme, favori haberler gibi özelliklere erişmen planlanıyor.

---

## Kurulum
1. Bu repoyu klonla:
   git clone https://github.com/kullaniciadi/anlik.git

2. Gerekli bağımlılıkları yükle:
   cd client
   npm install

3. Uygulamayı başlat:
   npm start

## Geliştirici Notları
Bu proje yazılım stajyeri teknik değerlendirme süreci kapsamında geliştirilmiştir.
Ek olarak kullanıcı şifre sıfırlama işlemleri, profil güncelleme ve haber favorileme gibi özellikler ilerleyen versiyonlarda eklenecektir.


