import express from 'express';
import { handleOrganizeNotes } from '../controllers/noteController.js';
import { handleSummarize } from '../controllers/summaryController.js';
import { handlePlan } from '../controllers/planController.js';

const router = express.Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
  res.status(200).json({
    status: 'ok',
    service: 'StudyHub AI Backend',
    timestamp: new Date().toISOString(),
    aiStatus: hasKey ? 'live' : 'demo'
  });
});

// Core AI Endpoints
router.post('/organize-notes', handleOrganizeNotes);
router.post('/summarize', handleSummarize);
router.post('/plan', handlePlan);

export default router;
