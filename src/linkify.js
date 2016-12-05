'use strict';

const wikiURL = require('./wikiurl');

const xpathExpr = './/text()[\
      not(ancestor::a) \
  and not(ancestor::form) \
  and not(ancestor::head) \
  and not(ancestor::input) \
  and not(ancestor::noscript) \
  and not(ancestor::option) \
  and not(ancestor::pre) \
  and not(ancestor::script) \
  and not(ancestor::style) \
  and not(ancestor::textarea) \
  and not(ancestor::title) \
  and contains(., "《") \
  and contains(., "》") \
]';

function replaceWithLink(targetNode) {
  const newNode = document.createElement('a');
  newNode.setAttribute('href', wikiURL(targetNode.textContent));
  newNode.setAttribute('target', '_blank');
  newNode.classList.add('OCGCardNameLink__link');
  newNode.appendChild(document.createTextNode(targetNode.textContent));

  targetNode.parentNode.replaceChild(newNode, targetNode);
}

function linkify(rootNode) {
  const snapshot = document.evaluate(xpathExpr, rootNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (let i = 0; i < snapshot.snapshotLength; i++) {
    let node = snapshot.snapshotItem(i);
    const re = /《(.+?)》/g;
    let arr;
    while ((arr = re.exec(node.textContent)) !== null) {
      const targetNode = node.splitText(arr.index);
      node = targetNode.splitText(re.lastIndex - arr.index);
      re.lastIndex = 0;

      replaceWithLink(targetNode);
    }
  }
}

module.exports = linkify;
