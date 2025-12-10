import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'
import { roomStore } from './cacheStore.js';

export const app = express();
export const server = createServer(app);

export const io = new Server(server);
io.on("connection",(socket)=>{
    console.log("connected");
    
    //When someone joins a room
    socket.on("join-room",({roomId,userName})=>{
        const room = roomStore.get(roomId);
        if(!room){
            socket.emit("room-error",{message:"Room Not found"})
            return
        }
        socket.join(roomId);
        const user ={
            id:crypto.randomUUID(),
            name:userName,
        };
        const users = room.users||[];
        const updatedRoom={
            ...room,
            users:[...users,user]
        }
        roomStore.set(roomId,updatedRoom,room.ttl);
        io.to(roomId).emit("room-join",{
            roomId,
            users:updatedRoom.users,
            user:user
        })

    });

    //When someone leaves
    socket.on("leave-room",({roomId,userId})=>{
        const room = roomStore.get(roomId);
        if(!room) return
        socket.leave(roomId);
        const users = room.users.filter((u)=>u.id!==userId)
        const updatedRoom = {...room,users};
        roomStore.set(roomId,updatedRoom,room.ttl);
        io.to(roomId).emit("room-left",{
            roomId,
            users:updatedRoom.users,
            userId:userId
        })
    })

})

export default app