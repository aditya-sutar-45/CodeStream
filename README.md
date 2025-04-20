# CodeStream

**CodeStream** is a real-time collaborative code editor and whiteboard tool designed for seamless team collaboration without requiring user authentication. Built with React, Node.js, Socket.IO, and Firebase, it allows users to create or join rooms, write code together, sketch ideas on a whiteboard, and collaborate live—just like a virtual coding room.

## Features

- Real-time collaborative code editing using Monaco Editor
- Collaborative whiteboard with drawing tools (pencil, shapes, text, eraser)
- Cursor and selection syncing for multiple users
- Room-based system (create/join with ID and optional password)
- Optional Firebase authentication with email verification and password reset
- Custom theming (VS Code-like themes)
- Backend with MongoDB and Firebase for data and authentication

## Preview

![CodeStream Screenshot](TODO:add-screenshot-link)

## Tech Stack

**Frontend:**
- React + Vite
- @monaco-editor/react
- Rough.js
- Socket.IO Client
- Radix UI
- Tailwind CSS

**Backend:**
- Node.js + Express
- Socket.IO Server
- MongoDB
- Firebase Auth

## Installation

### Prerequisites
- Node.js & npm
- MongoDB
- Firebase project

### Clone the repository
```bash
git clone https://github.com/aditya-sutar-45/CodeStream.git 
cd CodeStream 
```

### Setup the Server
```bash
cd server
npm install
```

Create a .env file inside the server directory with the following values:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

Start the development server:
```bash
node --watch server.js
```

### Setup the Client
```bash
cd ../client
npm install
npm run dev
```
The app should now be running at http://localhost:5173.

