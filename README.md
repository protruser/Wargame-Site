# 🛡️ IT₩argame

> It is a platform that allows you to develop your skills while solving various challenges that may occur on the website.
![image](https://github.com/user-attachments/assets/59bb6ea4-5dbb-4669-8ed3-4c36ea63ac4a)

---

## 🔍 Introduction

The platform provides basic websites with vulnerabilities in the form of sandboxes.
Users can also solve each challenge and compete for rankings among others!

- Web Hacking

---

## 🚀 Feature

-  User Register/Login
  ![image](https://github.com/user-attachments/assets/4ec24cfa-099d-4163-b6cd-a2d2d33a8be6)
Users must enter username, email, and password in the membership registration. <br>
Username doesn't matter if it's in a free format, but email should keep the "@seoultech.ac.kr " format, and password requires 8 digits, including all English uppercase letters, lowercase letters, numbers, and special characters.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/309fcdf8-9b22-4b76-bb12-0691d096fb0a" width="400"/>
</div>


Users can log in by entering your email and password.

<br>
<br>

- 🧩 Challenges
![image](https://github.com/user-attachments/assets/6591a11c-2c74-4cc7-946b-eee5b4c347f9)
If the users enter the challenge from the navigator bar, you can see three challenges.

<br>

![image](https://github.com/user-attachments/assets/d9f32846-a11c-46a8-be02-f378042da891)
If users press one of the challenge cards, the modal window appears, and users can solve the challenges by clicking the 9000 port number.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/67495ce1-7494-4e44-bcd0-09e076121bef" width="400"/>
  <img src="https://github.com/user-attachments/assets/de9f8cd7-3be1-42a7-8c5b-3abc5ad488de" width="400"/>
</div>

If the challenge is solved according to the given conditions, the correct answer can be obtained in the form of "FLAG{}", return to the modal window and attach the correct answer, and the challenge can be solved.
  
![image](https://github.com/user-attachments/assets/ea572905-0e6b-40e0-b5b7-08a2a19f4309)

<br>
<br>

- 📊 Ranking
![image](https://github.com/user-attachments/assets/d5161f2a-6763-4e83-8d6b-307ae26f3889)
This server provides the date of solving the challenge and the user nickname in the chart, so users can compete for points between others!

![image](https://github.com/user-attachments/assets/3ce13b30-de09-4101-a4d6-8b72430649e4)
Users can even view other users' challenge pool records.

---

## ⚙️ 기술 스택

### Backend
- Node.js / Express / REST API
- sqlite3
- bcrypt / jsonwebtoken / crypto
- cors / dotenv / helmet / morgan
- body-parser / cookie-parser / fs / path
- jest / supertest

### Frontend
- Vite / React / pnpm
- Taliwind CSS / PostCSS / Autoprefixer
- Framer Motion / AOS(Animate On Scroll)
- Recharts, ApexCharts, react-apexcharts

---

## 🛠️ Install

```bash
# 1. github clone
git clone https://github.com/username/wargame-platform.git
cd Wargame-Site

# 2. Frontend install
cd client
pnpm start

# 3. Backend install
cd server
npm run wargame
