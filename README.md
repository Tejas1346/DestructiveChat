# Destructive Chat

**A real-time ephemeral chat app where rooms and messages completely self-destruct after a set time limit. Create a room with TTL → Share code → Chat → Everything auto-deletes forever.**

## 🚀 Key Features

- **Self-destructing rooms**: Auto-kick all users + delete room data when TTL expires
- **Ephemeral messages**: In-memory only, vanish with room (no persistence)
- **Shareable room codes**: 6-char codes for instant anonymous joining
- **Configurable TTL**: Set lifetime (5m, 30m, 1h, 24h options)
- **Real-time communication**: Socket.IO for live messaging + user presence
- **Automatic cleanup**: `node-cache` enforces expiry → Zero traces left
- **Modern UI**: React + Tailwind + shadcn/ui components
