export function autoResizeUI() {
  if (window.innerWidth > 768) {
    let scale = Math.min(Math.max(window.innerWidth / 1440, 0.8), 1.2);
    document.documentElement.style.setProperty('--ui-scale', scale.toFixed(3));
  } else {
    document.documentElement.style.setProperty('--ui-scale', '1.0');
  }
}

export function showToast(msg, duration = 2000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = msg;
  container.appendChild(toast);

  // Animation frame for smooth entry
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}
