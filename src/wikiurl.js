import encoding from 'encoding-japanese';

const baseURL = 'http://yugioh-wiki.net/index.php';

export default function wikiURL(name) {
  const zenkakuName = encoding.toZenkakuCase(name).replace(/．/g, '.');
  const utf8Buffer = new TextEncoder().encode(zenkakuName);
  const eucjpBuffer = encoding.convert(utf8Buffer, { from: 'UTF8', to: 'EUCJP' });
  const encodedQuery = encoding.urlEncode(eucjpBuffer);
  return `${baseURL}?${encodedQuery}`;
}
