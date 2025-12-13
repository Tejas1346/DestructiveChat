import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { messageStore, roomStore } from "./cacheStore.js";
import cors from "cors";
export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("connected");

  //When someone joins a room
  socket.on("join-room", ({ roomId, userName }) => {
    try {
      console.log("Join Room By", userName, "roomId", roomId);

      const room = roomStore.get(roomId);
      if (!room) {
        socket.emit("room-error", { message: "Room Not found" });
        console.log("room not found");
        return;
      }
      socket.join(roomId);
      const user = {
        id: socket.id,
        name: userName,
      };
      const users = room.users || [];
      const updatedRoom = {
        ...room,
        users: [...users, user],
      };
      roomStore.set(roomId, updatedRoom, room.ttl);
      io.to(roomId).emit("room-join", {
        roomId,
        user: user,
      });
      console.log(userName);
    } catch (error) {
      console.log(error.message);
    }
  });

  //When someone leaves
  socket.on("leave-room", ({ roomId, userId }) => {
    const room = roomStore.get(roomId);
    if (!room) return;
    socket.leave(roomId);
    const users = room.users.filter((u) => u.id !== userId);
    const updatedRoom = { ...room, users };
    roomStore.set(roomId, updatedRoom, room.ttl);
    io.to(roomId).emit("room-left", {
      roomId,
      users: updatedRoom.users,
      userId: userId,
    });
  });

  socket.on("send-message", async ({ roomId, text, senderId,userName }) => {
    try {
      if (!text || !roomId || !senderId) {
        socket.emit("message-error", { message: "Invalid input" });
        return;
      }
      const room = roomStore.get(roomId);
      if (!room) {
        socket.emit("message-error", { message: "Room Not found" });
      }
      const message = {
        id:crypto.randomUUID(),
        text:text,
        roomId:roomId,
        senderId:senderId,
        createdAt:Date.now(),
        userName:userName
      }
      const existingMessages = messageStore.get(roomId);
      existingMessages.push(message);
      messageStore.set(roomId,existingMessages,300);

      io.to(roomId).emit("recieve-message",message);
    } catch (error) {
      console.log("Error in send message",error.message);
      socket.emit("message-error",{message:"Internal Server Error"})
    }
  });
});

export default app;
