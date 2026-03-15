const userCache = new Map();
const pendingRequests = new Map();
const processedElements = new WeakSet();

async function fetchUserInterests(username) {
  if (userCache.has(username)) return userCache.get(username);
  if (pendingRequests.has(username)) return pendingRequests.get(username);

  const promise = fetch(`${API_BASE_URL}/users/${username}/interests`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .finally(() => pendingRequests.delete(username));

  pendingRequests.set(username, promise);
  const result = await promise;
  userCache.set(username, result);
  return result;
}

function extractUsername(element) {
  const href = element.getAttribute("href");
  if (!href) return null;
  const match = href.match(/^\/([^/?]+)$/);
  return match ? match[1] : null;
}

function createBadge(userData) {
  const badge = document.createElement("span");
  badge.className = "ib-badge";

  const label = document.createElement("span");
  label.className = "ib-label";
  label.textContent = "◆";

  const pills = document.createElement("span");
  pills.className = "ib-interests";
  userData.interests.forEach((i) => {
    const pill = document.createElement("span");
    pill.className = "ib-pill";
    pill.textContent = i.name;
    pills.appendChild(pill);
  });

  badge.appendChild(label);
  badge.appendChild(pills);

  badge.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    badge.classList.toggle("ib-expanded");
  });

  return badge;
}

async function processElement(element) {
  if (processedElements.has(element)) return;

  const userNameBlock = element.closest('[data-testid="User-Name"]');
  if (!userNameBlock) return;
  if (userNameBlock.querySelector(".ib-badge")) return;

  processedElements.add(element);

  const username = extractUsername(element);
  if (!username) return;

  const data = await fetchUserInterests(username);
  if (!data || !data.interests || data.interests.length === 0) return;

  element.setAttribute("data-ib", "done");
  const badge = createBadge(data);
  userNameBlock.parentNode.insertBefore(badge, userNameBlock.nextSibling);
}

function scan() {
  document.querySelectorAll('[data-testid="User-Name"]').forEach((block) => {
    if (block.querySelector(".ib-badge")) return;
    const firstLink = block.querySelector('a[href^="/"]');
    if (firstLink) processElement(firstLink);
  });
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedScan = debounce(scan, 300);

const observer = new MutationObserver(debouncedScan);
observer.observe(document.body, { childList: true, subtree: true });

scan();
