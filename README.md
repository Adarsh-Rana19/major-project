# CodeX Collab - Ready Repo

## What this includes
- `server/` - Node.js + Express + Socket.IO server that:
  - Serves the frontend (from `server/public`)
  - Provides `/compile` endpoint which compiles and runs Java code inside a Docker container (requires Docker)
  - Provides simple Socket.IO signaling for WebRTC

- `server/public/` - Frontend files:
  - `index.html` - The landing page (kept exactly as you provided)
  - `room.html` - Room page with Java editor and WebRTC video call
  - `style.css` - Your original stylesheet (unchanged)
  - `room.css` - Additional styles for the room page

## Requirements
- Node.js (v18+ recommended)
- npm
- Docker (for running Java safely). If you cannot run Docker, the `/compile` endpoint will fail. See notes below.

## Quick start
1. Open terminal and go to `server` folder:
   ```bash
   cd server
   npm install
   npm start
   ```
2. Open your browser at `http://localhost:4000`
3. Create or join a room, open another tab with same `?room=...` to test video and Java compile.

## Notes
- The `/compile` endpoint executes `docker run` to sandbox Java compilation and execution. Ensure Docker is running and your user can run Docker commands.
- For public deployments, add HTTPS and a TURN server (coturn) for WebRTC reliability behind NAT.
- Production hardening: further sandboxing (seccomp/apparmor), run containers on isolated hosts, limit resource usage, validate inputs, and add authentication.

