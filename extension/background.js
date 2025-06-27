let currentTab = null;
let startTime = Date.now();
let isIdle = false;

// Listen for messages from content.js about user being idle
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "USER_IDLE") {
    console.log("🚫 User is idle, pausing tracking...");
    isIdle = true;
  } else if (message.type === "USER_ACTIVE") {
    console.log("✅ User is active again.");
    isIdle = false;
    startTime = Date.now(); // reset timer on resume
  }
});

// Trigger when tab is switched
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url && tab.url.startsWith("http")) {
    handleTabSwitch(tab.url);
  }
});

// Trigger when tab is reloaded or updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    handleTabSwitch(tab.url);
  }
});

function handleTabSwitch(url) {
  const endTime = Date.now();
  const timeSpent = endTime - startTime;

  if (currentTab && !isIdle) {
    const domain = currentTab;
    const date = new Date().toISOString().slice(0, 10); // e.g., 2025-06-27
    const userId = "user123"; // You can make this dynamic

    // Send time data to backend
    fetch("http://localhost:5000/api/analytics/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain,
        timeSpent,
        date,
        userId
      })
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Logged to backend:", data))
      .catch((err) => console.error("❌ Failed to log:", err));
  }

  currentTab = new URL(url).hostname;
  startTime = Date.now();
}
