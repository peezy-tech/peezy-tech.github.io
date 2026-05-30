const linkList = document.querySelector("[data-link-list]");
const showForks = document.querySelector("[data-show-forks]");

const forkLinks = [
  ["codex fork", "https://github.com/peezy-tech/codex"],
  ["jojo.build", "https://jojo.build/peezy-tech/jojo"],
  ["x402", "https://github.com/peezy-tech/x402"],
];

const renderLinks = (links) => {
  if (!linkList) return;

  linkList.replaceChildren(
    ...links.map(([label, href]) => {
      const item = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.href = href;
      anchor.rel = "noopener noreferrer";
      anchor.textContent = label;
      item.append(anchor);

      return item;
    }),
  );
};

showForks?.addEventListener("click", () => {
  if (!linkList) return;

  linkList.classList.add("is-changing");

  window.setTimeout(() => {
    renderLinks(forkLinks);
    linkList.classList.remove("is-changing");
  }, 180);
});
