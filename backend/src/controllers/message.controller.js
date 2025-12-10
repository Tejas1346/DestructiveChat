import { roomStore,messageStore } from "../lib/cacheStore.js";
import {io} from '../lib/socket.js'
export const createMessage = (req,res)=>{
    try {
        const {roomId,text,senderId,senderName}=req.body;
        if (!text || !senderId || !senderName) {
            return res.status(400).json({ message: "Invalid input" });
        }   
        const room = roomStore.get(roomId);
        if(!room) return res.status(404).json({message:"Room Not found "});
         
        const message = {
            id:crypto.randomUUID(),
            roomId,
            text,
            senderId,
            senderName,
            createdAt:Date.now()
        } 
        const existing = messageStore.get(roomId)||[];
        existing.push(message);
        messageStore.set(roomId,existing,300);

        io.to(roomId).emit("send-message",message);

        return res.status(201).json(message);
    } catch (error) {
        console.log("Error in createMessage",error.message);
        res.status(500).json({message:"Internal Server Error"}) 
    }
}

export const getMessagesByRoom = (req,res)=>{
    try {
        const roomId = req.params.roomId;
        const room = roomStore.get(roomId);
        if(!room) return res.status(404).json({message:"Room Not found"});
        const messages = messageStore.get(roomId);
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessagesByRoom",error.message)
        res.status(500).json({message:"Internal Server Error"}); 
    }
}
