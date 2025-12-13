import { messageStore, roomStore } from "../lib/cacheStore.js";
import { getRemainingTTL } from "../utils/roomUtils.js";
import { io } from "../lib/socket.js";
import cryptoRandomString from "crypto-random-string";
export const getAllRooms = (req, res) => {
  try {
    const keys = roomStore.keys();
    const rooms = keys
      .map((roomId) => {
        const room = roomStore.get(roomId);
        if (!room) return null;
        return room;
      })
      .filter(Boolean);

    res.status(200).json(rooms);
  } catch (error) {
    console.log("Error in getAllRooms", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createRoom = (req, res) => {
  try {
    const { name, ttl } = req.body;
    if (!name || !ttl)
      return res.status(400).json({ message: "Invalid input" });
    const roomId = crypto.randomUUID();
    console.log(roomId);
    const roomCode = cryptoRandomString({ length: 8, type: "alphanumeric" });
    const room = {
      id: roomId,
      roomCode: roomCode,
      name: name,
      createdAt: Date.now(),
      users: [],
      ttl: ttl,
      expiresAt: Date.now() + ttl * 1000,
    };
    const messages =[]
    roomStore.set(roomId, room, ttl);
    messageStore.set(roomId,messages,ttl);
    res.status(201).json(room);
  } catch (error) {
    console.log("Error in createRoom", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRoomByCode = (req, res) => {
  const roomCode = req.params.roomCode;
  console.log("RoomCode", roomCode);
  try {
    const keys = roomStore.keys();
    const theRoom = keys
      .map((roomId) => {
        const room = roomStore.get(roomId);
        if (!room) return null;
        return room;
      })
      .filter(Boolean)
      .find((room) => room.roomCode === roomCode);

    if (!theRoom) res.status(404).json({ message: "Room not found" });
    console.log("roomByCode", theRoom);
    res.status(200).json(theRoom);
  } catch (error) {
    console.log("Error in getRoomByCode", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
