const encoding = require('encoding-japanese');

const baseURL = 'http://yugioh-wiki.net/index.php';

function wikiURL(name) {
  const utf8Buffer = new TextEncoder().encode(encoding.toZenkakuCase(name));
  const eucjpBuffer = encoding.convert(utf8Buffer, { from: 'UTF8', to: 'EUCJP' });
  const encodedQuery = encoding.urlEncode(eucjpBuffer)
    .replace(/%A1%A5/g, '.');  // do not encode dots
  return `${baseURL}?${encodedQuery}`;
}

module.exports = wikiURL;
