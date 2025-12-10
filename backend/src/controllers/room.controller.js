import { roomStore } from "../lib/cacheStore.js"
import { getRemainingTTL } from "../utils/roomUtils.js";
import {io} from '../lib/socket.js'
export const getAllRooms = (req,res)=>{
    try {
        const keys = roomStore.keys();
        const rooms = keys.map((roomId)=>{
            const room =roomStore.get(roomId);
            if(!room) return null;
            return {
                ...room,
                ttlRemaining:getRemainingTTL(room)
            }
        }).filter(Boolean)

        res.status(200).json(rooms);
    } catch (error) {
        console.log("Error in getAllRooms",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const createRoom = (req,res)=>{
    try {
        const {name,ttl} = req.body;
        if(!name||!ttl) return res.status(400).json({message:"Invalid input"});
        const roomId = crypto.randomUUID();
        const room ={
            id:roomId,
            name:name,
            createdAt:Date.now(),
            users:[],
            ttl:ttl,
            expiresAt:Date.now()+(ttl*1000),
        };

        roomStore.set(roomId,room,ttl);
        io.emit('room-created',room);
        res.status(201).json(room);
    } catch (error) {
        console.log("Error in createRoom",error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }
}

export const getRoomById = (req,res)=>{
    const roomId = req.params.roomId;
    try {
        const room = roomStore.get(roomId);
        if(!room) res.status(404).json({message:"Room not found"});
        res.status(200).json({
            ...room,
            ttlRemaining: getRemainingTTL(room),
        }); 
    } catch (error) {
        console.log("Error in getRoomById",error.message);
        res.status(500).json({message:"Internal Server Error"}); 
    }

}