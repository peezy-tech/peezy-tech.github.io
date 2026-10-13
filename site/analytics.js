/* Shared analytics policy v1. Source: peezy-tech/vps hosts/jojo-01/analytics/client.js. */
(() => {
  if (window.peezyAnalytics) return;
  const sites = {"peezy.tech":{"name":"peezy.tech","domain":"peezy.tech","environment":"production","id":"57bf0990-8324-40a2-9c1e-54641ebf3065"},"patch.moi":{"name":"patch.moi","domain":"patch.moi","environment":"production","id":"b1a68655-470f-4824-994c-e7a3e51fa16c"},"pub.moi":{"name":"pub.moi","domain":"pub.moi","environment":"production","id":"ada8b2cd-697c-4c7e-995e-b85d2155f91c"},"pledge.cash":{"name":"Pledge","domain":"pledge.cash","environment":"production","id":"77fae833-fe87-4671-a771-07793a5bcbb0"},"game.peezy.tech":{"name":"Game","domain":"game.peezy.tech","environment":"devnet","id":"cce8a590-79fd-4a1b-bf9e-09ba587cb536"},"devnet.load.game":{"name":"Pledge shared devnet","domain":"devnet.load.game","environment":"devnet","id":"467aa820-1f77-4d55-9ed2-2decab38462b"},"tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"analytics-test.invalid":{"name":"Analytics verification","domain":"analytics-test.invalid","environment":"test","id":"3c92f932-c151-4a9d-9690-ea7a9903d77f"},"www.pledge.cash":{"name":"Pledge","domain":"pledge.cash","environment":"production","id":"77fae833-fe87-4671-a771-07793a5bcbb0"},"tycoon.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"revival.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"signal-garden.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"exchange-tower.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"hyperevm-shares.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"movement-demo.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"},"sketchbook-port.tmp.peezy.tech":{"name":"Private previews","domain":"tmp.peezy.tech","environment":"preview","id":"a15ad07e-7121-4c91-9cab-85178ef152dd"}};
  const site = sites[location.hostname];
  const disabled = () => {
    try { return navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true || localStorage.getItem('umami.disabled') === '1'; }
    catch { return true; }
  };
  if (!site || disabled()) return;
  const events = new Set(['outbound_opened', 'sign_in_started', 'account_opened', 'wallet_connected', 'transaction_started', 'transaction_confirmed', 'transaction_failed', 'launch_started', 'launch_step', 'launch_validation', 'launch_completed', 'launch_failed', 'launch_recovered', 'grant_started', 'grant_step', 'grant_validation', 'grant_completed', 'grant_failed', 'grant_recovered', 'action_started', 'action_step', 'action_validation', 'action_completed', 'action_failed', 'action_recovered']);
  const path = value => {
    try {
      const p = new URL(value, location.origin).pathname;
      if (/^\/(admin|api|migration|oidc|consent|link-social)(\/|$)/.test(p)) return null;
      if (/^\/(|account|sign-in|farms\/?|docs\/?|about\/?|pricing\/?|pledge-prelaunch\/?)$/.test(p)) return p;
      return '/:page';
    } catch { return '/:page'; }
  };
  let distinctId = /^[a-f0-9]{64}$/.test(window.__PEEZY_ACCOUNT_CONFIG__?.analyticsId || '') ? window.__PEEZY_ACCOUNT_CONFIG__.analyticsId : undefined;
  const pending = [];
  window.peezyAnalyticsBeforeSend = (type, p) => {
    if (disabled() || !p || type !== 'event') return null;
    const url = path(p.url || location.href);
    if (url === null || (p.name && !events.has(p.name))) return null;
    let referrer = '';
    try { referrer = p.referrer ? new URL(p.referrer).origin : ''; } catch {}
    const data = { environment: site.environment };
    for (const [key, value] of Object.entries(p.data || {})) {
      if (key === 'step' && Number.isInteger(value) && value >= 0 && value <= 100) data.step = value;
      if (['action','destination'].includes(key) && typeof value === 'string' && /^[a-zA-Z0-9._-]{1,48}$/.test(value)) data[key] = value;
    }
    return { website: site.id, hostname: location.hostname, url, referrer, title: site.name,
      language: navigator.language, screen: `${screen.width}x${screen.height}`,
      ...(p.name ? {name:p.name} : {}), data, ...(distinctId ? {id:distinctId} : {}) };
  };
  const run = (name, data) => {
    if (disabled() || !events.has(name)) return;
    if (window.umami) void window.umami.track(name, data);
    else if (pending.length < 30) pending.push([name,data]);
  };
  window.peezyAnalytics = { track:run, identify(id) { if (/^[a-f0-9]{64}$/.test(id)) distinctId=id; }, reset() { distinctId=undefined; } };
  const script = document.createElement('script');
  script.src = 'https://analytics.peezy.tech/script.js';
  script.async = true;
  script.dataset.websiteId = site.id;
  script.dataset.beforeSend = 'peezyAnalyticsBeforeSend';
  script.dataset.doNotTrack = 'true';
  script.dataset.autoTrack = 'true';
  script.onload = () => { for (const [name,data] of pending.splice(0)) run(name,data); };
  document.head.appendChild(script);
  if (location.pathname === '/account' && distinctId) run('account_opened');
  if (location.pathname === '/sign-in') run('sign_in_started');
  document.addEventListener('click', e => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    try {
      const target = new URL(a.href);
      if (target.hostname !== location.hostname && sites[target.hostname]) run('outbound_opened', {destination:target.hostname});
    } catch {}
  });
})();
