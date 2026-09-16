const API_BASE = '/api';

async function postJSON(endpoint, payload) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Something went wrong. Please try again.'
      };
    }

    return data;
  } catch (error) {
    console.error(`[API Call Error - ${endpoint}]:`, error);
    return {
      success: false,
      error: 'Unable to connect to StudyHub AI server. Please check your network connection.'
    };
  }
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) return { status: 'offline', aiStatus: 'demo' };
    return await res.json();
  } catch {
    return { status: 'offline', aiStatus: 'demo' };
  }
}

export async function fetchOrganizeNotes(text) {
  return postJSON('/organize-notes', { text });
}

export async function fetchSummarize(text) {
  return postJSON('/summarize', { text });
}

export async function fetchPlan(goal, deadline, availableTime, difficulty) {
  return postJSON('/plan', { goal, deadline, availableTime, difficulty });
}
