# Destructive  Chat Rooms

A real-time ephemeral chat application where rooms and messages completely self-destruct after a configurable time limit. Built with separate backend/frontend folders using Socket.IO for communication and node-cache for TTL-based storage. No persistence—everything vanishes when the room expires.

## 🚀 Key Features

- **Self-destructing rooms**: Auto-kick all users + delete all data when TTL expires
- **Ephemeral messages**: Stored only in memory, deleted with room expiry
- **Shareable room codes**: Create room → Get 6-char code → Anyone joins instantly
- **Configurable TTL**: Set room lifetime (5m, 30m, 1h, 24h options)
- **Real-time communication**: Socket.IO for live messaging + user presence updates
- **Automatic cleanup**: `node-cache` enforces TTL → Zero traces, no database
- **Anonymous access**: Username only, no accounts or authentication
- **Modern responsive UI**: React + Tailwind CSS + shadcn/ui components

**Complete flow**: Create room (name + TTL) → Copy/share 6-char code → Join anonymously → Real-time chat → Auto-kick + delete everything when time expires.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express.js, Socket.IO, node-cache |
| **Frontend** | React, Vite, Tailwind CSS, shadcn/ui |
| **Communication** | WebSocket (Socket.IO) |
| **Storage** | In-memory node-cache with TTL auto-expiry |

## ⚡ Quick Start


## Installation

Install the and start with npm

```bash
  cd backend
  npm install 
```

  ```bash
    cd frontend
    npm install 
```
## Deployment

To deploy this project run this command on both frontend and backend 

```bash
  npm run dev
```

