# peezy.tech

Public static landing page for `https://peezy.tech/`.

The site lives in `site/` and deploys through GitHub Pages with the workflow in
`.github/workflows/pages.yml`.

## Checks

```sh
npx --yes prettier@3.4.2 --check site/index.html site/styles.css site/script.js .github/workflows/pages.yml
node --check site/script.js
npx --yes html-validate@latest --rule doctype-style:off --rule void-style:off site/index.html
```
