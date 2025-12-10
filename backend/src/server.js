import express from 'express'
import dotenv from 'dotenv'
import roomRoutes from './routes/room.route.js'
dotenv.config();


const app = express();

app.use(express.json());
const PORT=process.env.PORT;

app.use('/api/rooms',roomRoutes)

app.listen(PORT,()=>{
    console.log("Listenign on Port",PORT);
})