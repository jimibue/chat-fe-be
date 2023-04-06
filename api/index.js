import express from 'express';
const router = express.Router()
import openAI from './openAI/index.js';
import langchain from './langchain/index.js';

router.use("/openai", openAI);
router.use("/langchain", langchain);

export default router;