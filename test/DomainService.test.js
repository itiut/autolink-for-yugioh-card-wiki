import assert from 'power-assert';

import DomainService from '../src/DomainService';

describe('DomainService', () => {
  describe('.normalize(domain)', () => {
    it('removes *:// prefix', () => {
      const domain = 'http://example.com';
      const got = DomainService.normalize(domain);
      assert(got === 'example.com');
    });

    it('trims path', () => {
      const domain = 'example.com/a/b/c';
      const got = DomainService.normalize(domain);
      assert(got === 'example.com');
    });
  });
});
