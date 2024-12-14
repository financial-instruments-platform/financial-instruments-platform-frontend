# Financial Instruments 📊

<p align="center">
  <img src="https://p7.hiclipart.com/preview/391/315/584/black-white-computer-icons-coin-money-coin-ico.jpg" alt="Virtual Arena Logo" width="200"/>
  <br>
  <em>A real-time financial instruments monitoring platform with integrated chat functionality</em>
  <br>
  <a href="https://financial-instruments-platform-frontend.onrender.com/register">View Live Demo</a>
</p>



## ⚠️ Important Note
> **First Request Delay**: Since this application is hosted on Render's free tier, the server enters a sleep state after 15 minutes of inactivity. When you make your first request, the server needs to wake up, which can take up to 30-60 seconds. Subsequent requests will work normally.

## 📋 Overview

Financial Instruments is a demonstration platform that provides real-time financial data monitoring capabilities with WebSocket integration. Users can subscribe to different financial instruments and communicate with other users through an integrated chat system.

## ✨ Key Features

### 🔐 User Authentication
- JWT-based authentication
- Secure login and registration
- Protected routes

### 📈 Financial Instruments
- Real-time data streaming via WebSocket
- Subscribe/Unsubscribe functionality
- Live price updates

### 💬 Chat System
- Real-time user-to-user messaging
- Message history
- Simple and intuitive interface

### 🎨 UI Features
- Responsive design
- Material-UI components
- User-friendly navigation
- Cross-device compatibility

## 🛠️ Technology Stack

### Frontend
- **Core**: React 18
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router v6
- **WebSocket**: Socket.IO Client
- **Styling**: Styled Components
- **State Management**: React Context

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/financial-instruments-platform/financial-instruments-platform-frontend.git

# Navigate to project directory
cd financial-instruments

# Install dependencies
npm install

# Start development server
npm start
```

## 📦 Dependencies

```json
{
  "@mui/material": "^5.16.7",
  "@mui/icons-material": "^5.16.7",
  "react": "^18.3.1",
  "react-router-dom": "^6.26.0",
  "socket.io-client": "^4.7.5",
  "styled-components": "^6.1.12"
}
```
## 🔗 Related Repositories
- Backend: [financial-instruments-platform-backend](https://github.com/financial-instruments-platform/financial-instruments-platform-backend.git)
- Mock data generation: [mock-data-generation-service](https://github.com/financial-instruments-platform/mock-data-generation-service)

## 👥 Author

- **Konstantine Vashalomidze** - _Initial work_ - [GitHub](https://github.com/KonstantineVashalomidze)

## Disclaimer

This project is for demonstration purposes only and will not receive ongoing maintenance or updates.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/KonstantineVashalomidze">Konstantine Vashalomidze</a>
  <br>
  <sub>A demonstration project showcasing real-time financial data monitoring and chat capabilities</sub>
</p>

