/* Framework-free interactions. The HTML remains readable without JavaScript. */
(() => {
  'use strict';
  const app = document.getElementById('app');
  const content = window.ELWGAR_CONTENT;
  const messages = window.ELWGAR_MESSAGES;
  const storage = (store, action, key, value) => {
    try { return window[store][action](key, value); } catch { return null; }
  };
  let lang = storage('localStorage', 'getItem', 'elwgar-lang') === 'en' ? 'en' : 'pl';
  let status = 'idle';
  let consent = storage('localStorage', 'getItem', 'elwgar-consent');

  function updatePage(nextLang, replace = true) {
    const form = app.querySelector('form');
    const fields = form ? Object.fromEntries(new FormData(form)) : {};
    lang = nextLang;
    if (replace) app.innerHTML = content[lang];
    document.documentElement.lang = lang;
    document.title = messages[lang].meta.title;
    document.querySelector('meta[name="description"]').content = messages[lang].meta.description;
    app.querySelectorAll('[aria-label="Language / Język"] button').forEach(button => {
      button.dataset.lang = button.textContent.toLowerCase();
    });
    const banner = app.querySelector('[role="dialog"]');
    banner.hidden = consent === 'accepted' || consent === 'declined';
    banner.querySelectorAll('button').forEach((button, index) => {
      button.dataset.consent = index === 0 ? 'accepted' : 'declined';
    });
    Object.entries(fields).forEach(([key, value]) => {
      const input = app.querySelector('form').elements.namedItem(key);
      if (input) input.value = value;
    });
    updateForm();
  }

  function updateForm() {
    const form = app.querySelector('form');
    form.querySelectorAll('[data-feedback]').forEach(node => node.remove());
    const button = form.querySelector('button[type="submit"]');
    button.hidden = status === 'success';
    button.disabled = status === 'sending';
    button.firstChild.textContent = status === 'sending' ? messages[lang].contact.sending : messages[lang].contact.send;
    if (status !== 'success' && status !== 'error') return;
    const feedback = document.createElement('div');
    feedback.dataset.feedback = '';
    feedback.setAttribute('role', status === 'success' ? 'status' : 'alert');
    feedback.className = status === 'success' ? 'border-2 border-black bg-black p-5 text-white font-bold uppercase tracking-[0.1em]' : 'font-mono text-xs uppercase tracking-[0.1em]';
    feedback.textContent = status === 'success' ? `✓ ${messages[lang].contact.success}` : `${messages[lang].contact.error} `;
    if (status === 'error') {
      const email = document.createElement('a');
      email.href = `mailto:${messages[lang].contact.emailAddr}`;
      email.textContent = messages[lang].contact.emailAddr;
      email.className = 'underline';
      feedback.append(email);
    }
    form.append(feedback);
  }

  async function logVisit() {
    if (consent !== 'accepted' || storage('sessionStorage', 'getItem', 'elwgar-visit-logged')) return;
    storage('sessionStorage', 'setItem', 'elwgar-visit-logged', '1');
    try {
      const response = await fetch('./api/visit', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({consent: true, path: location.pathname, lang}) });
      if (!response.ok) throw new Error('Visit not logged');
    } catch { storage('sessionStorage', 'removeItem', 'elwgar-visit-logged'); }
  }

  app.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.lang) {
      if (button.dataset.lang === lang) return;
      updatePage(button.dataset.lang);
      storage('localStorage', 'setItem', 'elwgar-lang', lang);
      app.querySelector(`[data-lang="${lang}"]`).focus({preventScroll: true});
    } else if (button.dataset.consent) {
      consent = button.dataset.consent;
      storage('localStorage', 'setItem', 'elwgar-consent', consent);
      app.querySelector('[role="dialog"]').hidden = true;
      logVisit();
    }
  });

  app.addEventListener('submit', async event => {
    if (!event.target.matches('form')) return;
    event.preventDefault();
    if (status === 'sending' || status === 'success') return;
    const data = Object.fromEntries(new FormData(event.target));
    status = 'sending';
    updateForm();
    try {
      const response = await fetch('./api/contact', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...data, lang})});
      if (!response.ok) throw new Error('Submission failed');
      status = 'success';
      app.querySelector('form').reset();
    } catch { status = 'error'; }
    updateForm();
  });

  updatePage(lang, lang !== 'pl');
  logVisit();
})();
