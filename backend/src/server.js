import express from 'express'
import dotenv from 'dotenv'
import roomRoutes from './routes/room.route.js'
import messageRoutes from './routes/message.route.js'
import {app,server} from './lib/socket.js'
dotenv.config();



app.use(express.json());
const PORT=process.env.PORT;

app.use('/api/rooms',roomRoutes)
app.use('/api/messages',messageRoutes);

server.listen(PORT,()=>{
    console.log("listening on PORT:",PORT);
})