import assert from 'power-assert';

import linkify from '../src/linkify';
import oneInP from './fixtures/one-in-p.html';
import severalInA from './fixtures/several-in-a.html';
import severalInP from './fixtures/several-in-p.html';

describe('linkify', () => {
  describe('default(rootNode)', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('creates a link in a <p>', () => {
      document.body.innerHTML = oneInP;
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 1);
      assert.equal(as[0].textContent, '《abc》');
      assert.ok(as[0].href);
      assert.equal(as[0].target, '_blank');
    });

    it('creates links in a <p>', () => {
      document.body.innerHTML = severalInP;
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 3);
      assert.equal(as[0].textContent, '《abc》');
      assert.equal(as[1].textContent, '《def》');
      assert.equal(as[2].textContent, '《ghi》');
    });

    it('does not create links in a <a>', () => {
      document.body.innerHTML = severalInA;
      linkify(document.body);
      const as = document.querySelectorAll('a');
      assert.equal(as.length, 1);
      assert.equal(as[0].textContent, '01《abc》23《def》456');
    });
  });
});
