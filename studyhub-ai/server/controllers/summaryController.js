import { summarizeText } from '../services/aiService.js';

export async function handleSummarize(req, res, next) {
  try {
    const { text } = req.body || {};

    // Validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Looks empty—paste some text first!'
      });
    }

    if (text.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'That input is too long. Try a shorter version.'
      });
    }

    const output = await summarizeText(text.trim());
    return res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}
