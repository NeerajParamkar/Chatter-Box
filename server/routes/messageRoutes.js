import express from 'express'
import { protectRoute } from '../middleware/auth.js';
import { getMessages, getuserforsidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';

const messageRouter=express.Router();

messageRouter.get('/users',protectRoute,getuserforsidebar)
messageRouter.get('/:id',protectRoute,getMessages)
messageRouter.put('mark/:id',protectRoute,markMessageAsSeen)
messageRouter.get('/send/:id',protectRoute,sendMessage)

export default messageRouter;