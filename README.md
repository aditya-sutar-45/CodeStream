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
git clone https://github.com/yourusername/codestream.git
cd codestream
