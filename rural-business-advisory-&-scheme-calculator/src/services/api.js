export async function fetchFeasibilityReport(inputs) {
  try {
    const res = await fetch("/api/advisory/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `Server responded with status ${res.status}: ${errorText}`,
      };
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("fetchFeasibilityReport error:", err);
    return {
      success: false,
      error: err?.message || "Failed to reach advisory service",
    };
  }
}

export async function sendAdvisorChat(params) {
  try {
    const res = await fetch("/api/advisory/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      return {
        success: false,
        error: "Advisor service is currently unavailable",
      };
    }

    return await res.json();
  } catch (err) {
    return {
      success: false,
      error: err?.message || "Network error sending chat",
    };
  }
}
