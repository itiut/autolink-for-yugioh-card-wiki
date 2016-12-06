'use strict';

const assert = require('power-assert');

const wikiURL = require('../src/wikiurl');

describe('wikiURL', () => {
  describe('default(name)', () => {
    it('returns URL of yugioh-wiki.net', () => {
      const url = wikiURL('');
      assert.ok(url.startsWith('http://yugioh-wiki.net/index.php?'));
    });

    it('converts name to EUC-JP URI-encoded query', () => {
      const tests = [
        { name: '《青眼の白龍》', query: '%A1%D4%C0%C4%B4%E3%A4%CE%C7%F2%CE%B6%A1%D5' },

        // converts half-width alnums, -, !, ?, &, / to full-width ones
        { name: '《ＡＢＣ－ドラゴン・バスター》', query: '%A1%D4%A3%C1%A3%C2%A3%C3%A1%DD%A5%C9%A5%E9%A5%B4%A5%F3%A1%A6%A5%D0%A5%B9%A5%BF%A1%BC%A1%D5' },
        { name: '《ABC-ドラゴン・バスター》', query: '%A1%D4%A3%C1%A3%C2%A3%C3%A1%DD%A5%C9%A5%E9%A5%B4%A5%F3%A1%A6%A5%D0%A5%B9%A5%BF%A1%BC%A1%D5' },
        { name: '《７》', query: '%A1%D4%A3%B7%A1%D5' },
        { name: '《7》', query: '%A1%D4%A3%B7%A1%D5' },
        { name: '《ワンチャン！？》', query: '%A1%D4%A5%EF%A5%F3%A5%C1%A5%E3%A5%F3%A1%AA%A1%A9%A1%D5' },
        { name: '《ワンチャン!?》', query: '%A1%D4%A5%EF%A5%F3%A5%C1%A5%E3%A5%F3%A1%AA%A1%A9%A1%D5' },
        { name: '《ギブ＆テイク》', query: '%A1%D4%A5%AE%A5%D6%A1%F5%A5%C6%A5%A4%A5%AF%A1%D5' },
        { name: '《ギブ&テイク》', query: '%A1%D4%A5%AE%A5%D6%A1%F5%A5%C6%A5%A4%A5%AF%A1%D5' },
        { name: '《スターダスト・ドラゴン／バスター》', query: '%A1%D4%A5%B9%A5%BF%A1%BC%A5%C0%A5%B9%A5%C8%A1%A6%A5%C9%A5%E9%A5%B4%A5%F3%A1%BF%A5%D0%A5%B9%A5%BF%A1%BC%A1%D5' },
        { name: '《スターダスト・ドラゴン/バスター》', query: '%A1%D4%A5%B9%A5%BF%A1%BC%A5%C0%A5%B9%A5%C8%A1%A6%A5%C9%A5%E9%A5%B4%A5%F3%A1%BF%A5%D0%A5%B9%A5%BF%A1%BC%A1%D5' },

        // encodes spaces, does not encode dots
        { name: '《Ｎｏ.１０１ Ｓ・Ｈ・Ａｒｋ Ｋｎｉｇｈｔ》', query: '%A1%D4%A3%CE%A3%EF.%A3%B1%A3%B0%A3%B1%20%A3%D3%A1%A6%A3%C8%A1%A6%A3%C1%A3%F2%A3%EB%20%A3%CB%A3%EE%A3%E9%A3%E7%A3%E8%A3%F4%A1%D5' },
        { name: '《No.101 S・H・Ark Knight》', query: '%A1%D4%A3%CE%A3%EF.%A3%B1%A3%B0%A3%B1%20%A3%D3%A1%A6%A3%C8%A1%A6%A3%C1%A3%F2%A3%EB%20%A3%CB%A3%EE%A3%E9%A3%E7%A3%E8%A3%F4%A1%D5' },
      ];

      for (const [i, { name, query }] of tests.entries()) {
        const url = wikiURL(name);
        const got = url.split('?')[1];
        assert.equal(got, query, `#${i}: wikiURL('${name}') failed`);
      }
    });
  });
});
