import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/room.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/room.html"));
});

// ✅ Java compiler API
app.post("/run-java", async (req, res) => {
  const { code, input } = req.body;
  const tempDir = path.join(__dirname, "temp");

  try {
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const javaFile = path.join(tempDir, "Main.java");
    fs.writeFileSync(javaFile, code);

    // Step 1️⃣ Compile Java
    await new Promise((resolve, reject) => {
      exec(`javac ${javaFile}`, (error, stdout, stderr) => {
        if (error) reject(stderr || error.message);
        else resolve(stdout);
      });
    });

    // Step 2️⃣ Run Java
    const runProcess = exec(
      `java -cp ${tempDir} Main`,
      (error, stdout, stderr) => {
        // Clean up temp folder
        fs.rmSync(tempDir, { recursive: true, force: true });

        if (error) {
          return res.json({ error: stderr || error.message });
        }
        res.json({ output: stdout });
      }
    );

    // Write input if available
    if (input) {
      runProcess.stdin.write(input + "\n");
      runProcess.stdin.end();
    }
  } catch (err) {
    res.json({ error: err.toString() });
  }
});

// ✅ Socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join-room", ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`👋 ${userName} joined room: ${roomId}`);
    socket.to(roomId).emit("user-joined", userName);
  });

  socket.on("editor-change", ({ roomId, content }) => {
    socket.to(roomId).emit("editor-update", content);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
