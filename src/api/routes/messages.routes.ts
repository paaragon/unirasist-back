import express from 'express';
import messagesController from '../controllers/messages.controller';
import validateRequest from '../mdw/validateRequest';
import { body } from 'express-validator';

const router = express.Router();

// define routes here
router.route('/')
    .post([
        body('context.studentId').isNumeric(),
        body('input.text').isString(),
    ], validateRequest, messagesController.sendNewMessage);

export default router;
