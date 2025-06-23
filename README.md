# Booking Backend API

Backend for a full-stack appointment booking system. Built with **Node.js**, **Express**, and **MongoDB**, it provides a secure API with JWT authentication and role-based access.

## 🌐 Live Frontend

👉 [Booking App Frontend (GitHub Pages)](https://kryzhanivskyi89.github.io/booking-frontend)

---

## 🛠 Technologies Used

- **Node.js**, **Express**
- **MongoDB**, **Mongoose**
- **JWT** (Authentication)
- **CORS**, **dotenv**

---

## 📦 Installation

```bash
git clone <https://github.com/Kryzhanivskyi89/booking-backend.git>
cd booking-backend
npm install
```

---

## 🚀 Scripts

Start in development mode:

```bash
npm run dev
```

Start in production mode:

```bash
npm start
```

---

## 📡 API Endpoints

All protected routes require a JWT token:

### 🔐 Auth Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get token |

---

### 👤 Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/users` | Get all users with role "business" |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user info |
| DELETE | /api/users/:id | Delete user |

---

### 📅 Bookings

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/bookings` | Get bookings for user |
| POST | `/api/bookings` | Create a booking |
| DELETE | `/api/bookings/:id` | Cancel a booking by ID |

---

## 👤 Author

**Andrii Kryzhanivskyi**

🔗 [GitHub Profile](https://github.com/Kryzhanivskyi89)

---

## 📄 License

This project is licensed under the <AndrewDev/>.

---

**Built with ❤️ by [Andrew Kryzhanivskyi](https://github.com/Kryzhanivskyi89)**