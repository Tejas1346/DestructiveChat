import express from 'express'
import { createRoom, getAllRooms, getRoomByCode } from '../controllers/room.controller.js';

const router = express.Router();

router.get('/',getAllRooms)
router.post('/',createRoom)
router.get('/:roomCode',getRoomByCode)

export default router