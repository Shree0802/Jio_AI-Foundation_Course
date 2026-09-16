import { planProject } from '../services/aiService.js';

export async function handlePlan(req, res, next) {
  try {
    const { goal, deadline, availableTime, difficulty } = req.body || {};

    // Validation
    if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Your goal is empty—tell me what you want to accomplish.'
      });
    }

    if (goal.length > 3000) {
      return res.status(400).json({
        success: false,
        error: 'That input is too long. Try a shorter version.'
      });
    }

    const output = await planProject({
      goal: goal.trim(),
      deadline: (deadline || '').trim(),
      availableTime: (availableTime || '').trim(),
      difficulty: (difficulty || '').trim()
    });

    return res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}
