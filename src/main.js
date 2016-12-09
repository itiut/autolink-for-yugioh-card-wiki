import linkify from './linkify';

window.addEventListener('DOMContentLoaded', () => {
  linkify(document.body);

  new MutationObserver((records) => {
    for (const record of records) {
      if (record.addedNodes.length > 0) {
        linkify(record.target);
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
});
