<div align="center">

# 🌐 dotConnect

### A Comprehensive Social Collaboration Platform

<p>
  <img src="https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-8.8.1-13aa52?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.IO-4.8-000?style=flat-square&logo=socketdotio" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/License-ISC-yellow?style=flat-square" alt="License" />
</p>

> ✨ **Connect, Share, and Collaborate in Real-Time** ✨
>
> A full-stack MERN platform connecting students and professionals through messaging, resource sharing, networking, and real-time collaboration.



---

## 🎯 What Makes dotConnect Special?

dotConnect is a **unified platform** for modern networking and collaboration:

✅ **Verified Accounts** - Secure signup with email OTP verification  
✅ **Real-time Messaging** - Instant chat with Socket.IO (Chit-Chat feature)  
✅ **Job Board** - Share and discover job opportunities  
✅ **Event Sharing** - Post and find events in your network  
✅ **Post Creation** - Share content with your connections  
✅ **Study Resources** - Share notes, papers, syllabi, and Q&A banks  
✅ **Connection System** - Build your professional network  
✅ **Live Notifications** - Real-time alerts for all activities  
✅ **Online Presence** - See who's active in real-time  
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


## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-otp` - Verify email OTP

### Messaging (Chit-Chat)
- `GET /api/messages/:userId` - Get chat history
- `POST /api/messages` - Send message
- `GET /api/users/online` - Get online users

### Users & Profiles
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users/search` - Search users

### Relationships & Connections
- `POST /api/relationships/request` - Send connection request
- `PUT /api/relationships/:id/accept` - Accept request
- `DELETE /api/relationships/:id` - Decline/remove connection
- `GET /api/relationships` - Get all connections

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Post a new job
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post details
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Study Resources
- `GET /api/resources/notes` - Get study notes
- `GET /api/resources/papers` - Get research papers
- `GET /api/resources/syllabus` - Get syllabi
- `GET /api/resources/q-bank` - Get Q&A banks
- `POST /api/resources` - Upload resource
- `DELETE /api/resources/:id` - Delete resource

### Notifications
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

---

## 🎨 Core Features

### 💬 Real-time Messaging (Chit-Chat)
- Instant message delivery with Socket.IO
- Online/offline user presence indicators
- Message history and conversation management
- Typing indicators
- Real-time notification alerts

### 🤝 Connection & Network
- Send and accept connection requests
- Manage your professional network
- View connected users
- Relationship status tracking
- Profile discovery

### 📚 Resource Hub
- **Jobs** - Post and browse job opportunities
- **Events** - Share and attend community events
- **Posts** - Create and share content
- **Study Materials** - Share notes, papers, syllabi, Q&A banks
- Resource categorization and search

### 👤 User Profiles
- Customizable profile with image uploads (Cloudinary)
- Bio and status updates
- Verified account badges
- Profile visibility settings
- Connection history

### 🔔 Smart Notifications
- Real-time connection requests
- Message notifications
- Resource sharing alerts
- Activity updates
- Customizable notification preferences

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

- 🐛 **Found a bug?** [Open an issue](https://github.com/Rajan-chaudhary-947/dotConnect/issues)
- 💡 **Have a feature idea?** [Start a discussion](https://github.com/Rajan-chaudhary-947/dotConnect/discussions)
- 📧 **Questions?** Reach out or check existing issues

---


## 👨‍💻 Author

<div align="center">

**Built with ❤️ by [Rajan Chaudhary](https://github.com/Rajan-chaudhary-947)**

</div>

---

<div align="center">

### ⭐ If you find this project helpful, please consider giving it a star!

[![GitHub stars](https://img.shields.io/github/stars/Rajan-chaudhary-947/dotConnect?style=social)](https://github.com/Rajan-chaudhary-947/dotConnect)
[![GitHub forks](https://img.shields.io/github/forks/Rajan-chaudhary-947/dotConnect?style=social)](https://github.com/Rajan-chaudhary-947/dotConnect)

### Built for Connection & Collaboration

**Happy Connecting!** 🚀

</div>
