import express from 'express'
import { getMessagesByRoom,createMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:roomId',getMessagesByRoom)
router.post('/',createMessage)

export default router