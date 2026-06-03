const linkList = document.querySelector("[data-link-list]");
const showForks = document.querySelector("[data-show-forks]");
const showPackages = document.querySelector("[data-show-packages]");

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

const packageLinks = [
  ["x402-hl", "https://www.npmjs.com/package/x402-hl"],
  ["codex-toys", "https://www.npmjs.com/package/codex-toys"],
];

const renderItems = (links, actions = []) => {
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
    ...actions.map((action) => {
      const item = document.createElement("li");
      const button = document.createElement("button");

      button.type = "button";
      button.textContent = action.label;
      button.addEventListener("click", action.onClick);
      item.append(button);

      return item;
    }),
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
    renderItems(mainLinks, [
      { label: "our forks", onClick: showForkLinks },
      { label: "packages", onClick: showPackageLinks },
    ]),
  );
};

const showForkLinks = () => {
  transitionTo(() =>
    renderItems(forkLinks, [{ label: "back", onClick: showMainLinks }]),
  );
};

const showPackageLinks = () => {
  transitionTo(() =>
    renderItems(packageLinks, [{ label: "back", onClick: showMainLinks }]),
  );
};

showForks?.addEventListener("click", showForkLinks);
showPackages?.addEventListener("click", showPackageLinks);
