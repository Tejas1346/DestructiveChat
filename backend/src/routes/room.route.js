import express from 'express'
import { createRoom, getAllRooms, getRoomById } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/',getAllRooms)
router.post('/',createRoom)
router.get('/:roomId',getRoomById)

export default router