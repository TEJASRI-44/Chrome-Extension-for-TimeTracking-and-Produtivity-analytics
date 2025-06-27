let idleTimeout;
const idleLimit = 60000; // 1 minute

function resetIdleTimer() {
  clearTimeout(idleTimeout);
  chrome.runtime.sendMessage({ type: "USER_ACTIVE" });

  idleTimeout = setTimeout(() => {
    chrome.runtime.sendMessage({ type: "USER_IDLE" });
  }, idleLimit);
}

["mousemove", "keydown", "scroll", "click"].forEach(event =>
  window.addEventListener(event, resetIdleTimer)
);

resetIdleTimer();
