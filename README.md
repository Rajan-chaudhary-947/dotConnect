<div align="center">

# 💬 Chit-Chat - dotConnect

### A Modern Real-time Social Chat Platform

<p>
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-8.8.1-13aa52?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.IO-4.8-000?style=flat-square&logo=socketdotio" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/License-ISC-yellow?style=flat-square" alt="License" />
</p>

> ✨ **Conversations that feel immediate but stay intentional** ✨
>
> A full-stack MERN social messaging platform with real-time communication, verified accounts, connection-based relationships, and instant notifications.

<img alt="dotConnect Demo" src="https://via.placeholder.com/800x400?text=Chit-Chat+Demo" width="100%" height="auto" style="border-radius: 10px; margin: 20px 0;">

</div>

---

## 🎯 What Makes Chit-Chat Special?

✅ **Email OTP Verification** - Secure signup with one-time passwords  
✅ **Real-time Messaging** - Instant messaging with Socket.IO  
✅ **Online Presence** - See who's online in real-time  
✅ **Connection System** - Send and manage connection requests  
✅ **Live Notifications** - Instant alerts for requests, accepts, and messages  
✅ **Profile Customization** - Upload profiles with Cloudinary  
✅ **Resource Sharing** - Share jobs, events, posts, and notes  
✅ **Mobile Responsive** - Works seamlessly on all devices  

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| **Node.js** | 16+ | JavaScript runtime |
| **npm/yarn** | Latest | Package manager |
| **MongoDB** | Local or Atlas | Database |
| **Gmail Account** | Any | OTP emails via SMTP |
| **Cloudinary** | Free tier | Image storage |

### Installation & Setup

<details open>
<summary><b>📦 Step 1: Clone Repository</b></summary>

```bash
git clone https://github.com/YOUR_USERNAME/dotConnect.git
cd dotConnect
```

</details>

<details open>
<summary><b>🔧 Step 2: Backend Setup</b></summary>

```bash
cd backend
npm install
cp .env.example .env
# ⚠️ Edit .env with your credentials
npm run dev
```

**Backend runs on:** `http://localhost:8080`

</details>

<details open>
<summary><b>⚛️ Step 3: Frontend Setup</b></summary>

```bash
cd frontend
npm install
cp .env.example .env
# ⚠️ Edit .env with your API URL
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

</details>

✅ **You're all set!** Open `http://localhost:5173` in your browser.

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%">

### 🎨 Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time
- **Lucide Icons** - Icon library

</td>
<td width="50%">

### 🔌 Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **Socket.IO** - Real-time server
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Cloudinary** - Image hosting
- **bcryptjs** - Password hashing

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 dotConnect/
├── 🔙 backend/
│   ├── src/
│   │   ├── 🎮 controllers/       # Business logic handlers
│   │   ├── 🗄️  models/            # MongoDB schemas
│   │   ├── 🛣️  routes/            # API endpoints
│   │   ├── 🔐 middleware/        # Auth & custom middleware
│   │   ├── 📚 lib/                # Utilities (DB, Socket, etc)
│   │   └── 🚀 index.js            # Server entry point
│   ├── package.json
│   └── .env.example
├── ⚛️  frontend/
│   ├── src/
│   │   ├── 🎨 components/        # Reusable components
│   │   ├── 📄 pages/              # Page components
│   │   ├── 🏪 store/              # Zustand state
│   │   ├── 🔗 lib/                # Axios & utilities
│   │   └── 📱 main.jsx            # Entry point
│   ├── package.json
│   └── .env.example
└── README.md
```

---

## ⚙️ Environment Variables

### Backend Configuration (.env)

```env
# Server
PORT=8080
NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/dotConnect

# Frontend
CLIENT_URL=http://localhost:5173

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Gmail SMTP)
HOST=smtp.gmail.com
SMTP_PORT=587
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_PASS=your_gmail_app_password
EMAIL_FROM=Chit-Chat <your_email@gmail.com>
```

### Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:8080/api
```

> 📝 **Note:** See `.env.example` files for templates. Never commit real `.env` files!

---

## 📦 Available Scripts

### Backend Commands
```bash
npm run dev        # 🚀 Start dev server with auto-reload
npm start          # ▶️  Start production server
npm run seed:posts # 🌱 Populate database with sample posts
```

### Frontend Commands
```bash
npm run dev        # 🚀 Start dev server on port 5173
npm run build      # 📦 Build for production
npm run lint       # 🔍 Check code quality
npm run preview    # 👁️  Preview production build
```

---

## 🔐 Security Best Practices

⚠️ **Critical Security Notes:**

- 🚫 **Never commit `.env` files** - Always use `.env.example` as template
- 🔑 **Use Gmail App Passwords** - Not your regular account password
- 🔐 **Strong JWT_SECRET** - Use a long random string in production
- 🌐 **CORS Configuration** - Only allow your frontend domain in production
- 🔄 **Rotate API Keys** - If ever exposed in logs or screenshots
- 📦 **npm audit** - Run regularly to check for vulnerabilities

```bash
# Check for vulnerabilities
npm audit
npm audit fix
```

---

## 🚢 Deployment Guide

### Deploy to Render (Recommended)

1. **Push code to GitHub**
2. **Create Render account** and connect GitHub
3. **Set environment variables** in Render dashboard
4. **Deploy** - Render handles the rest!

### MongoDB Atlas Setup

```bash
1. Create account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to your .env: MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Cloudinary Setup

```bash
1. Sign up at cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add to .env file
```

---

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify email OTP

### Messages
- `GET /api/messages/:userId` - Get chat history
- `POST /api/messages` - Send message

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile

### Relationships
- `POST /api/relationships/request` - Send connection request
- `PUT /api/relationships/:id/accept` - Accept request
- `DELETE /api/relationships/:id` - Decline/remove connection

---

## 🎨 Features Showcase

### 💬 Real-time Messaging
- Instant message delivery
- Online/offline indicators
- Message read status
- Typing indicators

### 👥 Connection System
- Send connection requests
- Accept/reject relationships
- View connected users
- Connection suggestions

### 🔔 Notifications
- Real-time notification alerts
- Request notifications
- Message notifications
- Connection updates

### 👤 User Profiles
- Custom profile pictures (Cloudinary)
- Bio and status updates
- Profile visibility
- Account verification

---

## 🤝 Contributing

We love contributions! Here's how to help:

1. 🍴 **Fork** the repository
2. 🌿 **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit changes** (`git commit -m 'Add amazing feature'`)
4. 📤 **Push to branch** (`git push origin feature/amazing-feature`)
5. 🔄 **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Test your changes locally
- Update documentation
- Don't commit sensitive data
- Keep commits atomic and descriptive

---

## 📞 Support & Community

- 🐛 **Found a bug?** [Open an issue](https://github.com/YOUR_USERNAME/dotConnect/issues)
- 💡 **Have a feature idea?** [Start a discussion](https://github.com/YOUR_USERNAME/dotConnect/discussions)
- 📧 **Questions?** Reach out or check existing issues

---

## 📄 License

This project is licensed under the **ISC License** - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ by [Rajan Chaudhary](https://github.com/YOUR_USERNAME)**

</div>

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/dotConnect?style=social)](https://github.com/YOUR_USERNAME/dotConnect)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/dotConnect?style=social)](https://github.com/YOUR_USERNAME/dotConnect)

### Made with 💬 Chit-Chat

**Happy Chatting!** 🎉

</div>
