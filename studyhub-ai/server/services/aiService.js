import { generateDemoNotes, generateDemoSummary, generateDemoPlan } from './demoService.js';

const getApiKey = () => process.env.GEMINI_API_KEY || '';

const isApiKeyValid = () => {
  const key = getApiKey();
  return key && key.trim() !== '' && key !== 'your_gemini_api_key_here';
};

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Call Gemini REST API securely from Node backend
 */
async function callGemini(contents, systemInstruction, generationConfig = null) {
  const apiKey = getApiKey();
  const url = `${GEMINI_ENDPOINT}?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: contents }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  if (generationConfig) {
    payload.generationConfig = generationConfig;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API HTTP ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return textOutput;
}

/**
 * Organize messy notes into clear structured Markdown
 */
export async function organizeNotes(text) {
  if (!isApiKeyValid()) {
    console.log('[AI Service] GEMINI_API_KEY missing or placeholder. Operating in DEMO MODE.');
    return {
      success: true,
      mode: 'demo',
      result: generateDemoNotes(text)
    };
  }

  try {
    const systemPrompt = `You are an expert academic note organizer.
Transform messy student notes into clear, structured study notes.
Identify meaningful topics and group related information under headings (using markdown ## and ###).
Use concise bullet points (•).
Remove repetition.
Correct obvious grammar issues.
Preserve the original meaning.
Do not add unsupported facts.
Make the result easy for a student to revise.`;

    const resultText = await callGemini(
      `Transform the following messy student notes into clear, structured study notes:\n\n${text}`,
      systemPrompt
    );

    return {
      success: true,
      mode: 'live',
      result: resultText.trim()
    };
  } catch (error) {
    console.error('[AI Service] Gemini API call failed for note organization:', error.message);
    return {
      success: true,
      mode: 'demo-fallback',
      warning: 'Live AI request unavailable. Showing intelligent sample response.',
      result: generateDemoNotes(text)
    };
  }
}

/**
 * Summarize text into 3-5 bullets + 1 key takeaway
 */
export async function summarizeText(text) {
  if (!isApiKeyValid()) {
    console.log('[AI Service] GEMINI_API_KEY missing or placeholder. Operating in DEMO MODE.');
    return {
      success: true,
      mode: 'demo',
      result: generateDemoSummary(text)
    };
  }

  try {
    const systemPrompt = `You are an expert academic summarizer.
Read the student's text and identify the most important ideas.
Return 3–5 concise bullet points followed by one one-line key takeaway.
Use simple student-friendly language.
Do not introduce information that is not present in the input.`;

    const jsonConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          bullets: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: '3 to 5 concise bullet points summarizing main concepts'
          },
          keyTakeaway: {
            type: 'STRING',
            description: 'One concise sentence explaining the overall main idea'
          }
        },
        required: ['bullets', 'keyTakeaway']
      }
    };

    const rawResult = await callGemini(
      `Summarize this academic text into bullet points and a single key takeaway sentence:\n\n${text}`,
      systemPrompt,
      jsonConfig
    );

    const parsedJson = JSON.parse(rawResult);
    return {
      success: true,
      mode: 'live',
      result: parsedJson
    };
  } catch (error) {
    console.error('[AI Service] Gemini API call failed for summarization:', error.message);
    return {
      success: true,
      mode: 'demo-fallback',
      warning: 'Live AI request unavailable. Showing intelligent sample response.',
      result: generateDemoSummary(text)
    };
  }
}

/**
 * Generate step-by-step project plan with time estimates
 */
export async function planProject({ goal, deadline, availableTime, difficulty }) {
  if (!isApiKeyValid()) {
    console.log('[AI Service] GEMINI_API_KEY missing or placeholder. Operating in DEMO MODE.');
    return {
      success: true,
      mode: 'demo',
      result: generateDemoPlan(goal, deadline, availableTime, difficulty)
    };
  }

  try {
    const systemPrompt = `You are an expert student project planner.
Transform a student's large goal into small actionable steps.
Order the steps logically.
Estimate realistic time for each step.
Keep the plan achievable for a student.
Include a suggested next action.
Do not create unnecessary tasks.`;

    const promptDetails = `
Goal: ${goal}
Deadline: ${deadline || 'Not specified'}
Available Time: ${availableTime || 'Flexible'}
Target Difficulty Level: ${difficulty || 'Beginner'}
    `.trim();

    const jsonConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          goal: { type: 'STRING' },
          deadline: { type: 'STRING' },
          availableTime: { type: 'STRING' },
          difficulty: { type: 'STRING' },
          totalEstimatedTime: { type: 'STRING', description: 'Total duration e.g. 3 hours 15 minutes' },
          steps: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                stepNumber: { type: 'INTEGER' },
                title: { type: 'STRING' },
                estimatedTime: { type: 'STRING' },
                notes: { type: 'STRING' }
              },
              required: ['stepNumber', 'title', 'estimatedTime']
            }
          },
          suggestedNextAction: { type: 'STRING' }
        },
        required: ['goal', 'totalEstimatedTime', 'steps', 'suggestedNextAction']
      }
    };

    const rawResult = await callGemini(
      `Create a step-by-step project plan with time estimates for this goal:\n\n${promptDetails}`,
      systemPrompt,
      jsonConfig
    );

    const parsedJson = JSON.parse(rawResult);
    return {
      success: true,
      mode: 'live',
      result: parsedJson
    };
  } catch (error) {
    console.error('[AI Service] Gemini API call failed for project planning:', error.message);
    return {
      success: true,
      mode: 'demo-fallback',
      warning: 'Live AI request unavailable. Showing intelligent sample response.',
      result: generateDemoPlan(goal, deadline, availableTime, difficulty)
    };
  }
}
