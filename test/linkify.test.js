'use strict';

const assert = require('power-assert');

const linkify = require('../src/linkify');

describe('linkify', () => {
  describe('default(rootNode)', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('creates a link in a <p>', () => {
      document.body.innerHTML = require('./fixtures/one-in-p.html');  // eslint-disable-line global-require
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 1);
      assert.equal(as[0].textContent, '《abc》');
      assert.ok(as[0].href);
      assert.equal(as[0].target, '_blank');
    });

    it('creates links in a <p>', () => {
      document.body.innerHTML = require('./fixtures/several-in-p.html');  // eslint-disable-line global-require
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 3);
      assert.equal(as[0].textContent, '《abc》');
      assert.equal(as[1].textContent, '《def》');
      assert.equal(as[2].textContent, '《ghi》');
    });

    it('does not create links in a <a>', () => {
      document.body.innerHTML = require('./fixtures/several-in-a.html');  // eslint-disable-line global-require
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 1);
      assert.equal(as[0].textContent, '01《abc》23《def》456');
    });
  });
});
