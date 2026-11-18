document.documentElement.classList.add("js");

// Apply the saved theme before interactions
try {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }
} catch (e) {}

// Light / dark mode toggle (pure dark mode by default)
const root = document.documentElement;
const isDark = () => root.dataset.theme !== "light";

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.classList.add("theme-anim");
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
  setTimeout(() => root.classList.remove("theme-anim"), 400);
});

// Duplicate carousel items so the loop is seamless
document.querySelectorAll(".marquee-track").forEach((track) => {
  [...track.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
    track.appendChild(clone);
  });
});

// "View work sample" buttons scroll to and highlight the matching sample
document.querySelectorAll("[data-show]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = document.getElementById(btn.dataset.show);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("flash");
    void card.offsetWidth;
    card.classList.add("flash");
  });
});

// Hovering a job outlines its sample on the right
document.querySelectorAll(".job[data-sample]").forEach((job) => {
  const card = document.getElementById(job.dataset.sample);
  if (!card) return;
  job.addEventListener("mouseenter", () => card.classList.add("linked"));
  job.addEventListener("mouseleave", () => card.classList.remove("linked"));
});

// Reveal sections as they scroll into view
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Disable common shortcuts like F12 (DevTools) and Ctrl+U (View Source)
document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.key === "u")) {
    e.preventDefault();
    alert("Inspecting code is disabled on this site.");
  }
});
