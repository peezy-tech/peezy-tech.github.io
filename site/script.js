const root = document.documentElement;
const progress = document.querySelector(".progress");
const revealTargets = document.querySelectorAll(".reveal");

const updateProgress = () => {
  const scrollable = document.body.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  root.style.setProperty(
    "--scroll-progress",
    `${Math.min(100, Math.max(0, pct))}%`,
  );
};

if (progress) {
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.18 },
);

for (const target of revealTargets) {
  observer.observe(target);
}
