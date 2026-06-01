const linkList = document.querySelector("[data-link-list]");
const showForks = document.querySelector("[data-show-forks]");

const mainLinks = [
  ["patch.moi", "https://patch.moi/"],
  ["jojo.build", "https://jojo.build/"],
  ["load.game", "https://load.game/"],
  ["pledge.cash", "https://pledge.cash/"],
];

const forkLinks = [
  ["codex fork", "https://github.com/peezy-tech/codex"],
  ["jojo.build", "https://jojo.build/peezy-tech/jojo"],
];

const renderItems = (links, action) => {
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
    ...(action
      ? [
          (() => {
            const item = document.createElement("li");
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = action.label;
            button.addEventListener("click", action.onClick);
            item.append(button);

            return item;
          })(),
        ]
      : []),
  );
};

const transitionTo = (render) => {
  if (!linkList) return;

  linkList.classList.add("is-changing");

  window.setTimeout(() => {
    render();
    linkList.classList.remove("is-changing");
  }, 180);
};

const showMainLinks = () => {
  transitionTo(() =>
    renderItems(mainLinks, { label: "our forks", onClick: showForkLinks }),
  );
};

const showForkLinks = () => {
  transitionTo(() =>
    renderItems(forkLinks, { label: "back", onClick: showMainLinks }),
  );
};

showForks?.addEventListener("click", showForkLinks);
