chrome.storage.local.get("usage", ({ usage }) => {
  const list = document.getElementById("siteList");
  if (!usage) return;

  Object.entries(usage).forEach(([site, time]) => {
    const li = document.createElement("li");
    li.textContent = `${site}: ${(time / 1000 / 60).toFixed(1)} mins`;
    list.appendChild(li);
  });
});
