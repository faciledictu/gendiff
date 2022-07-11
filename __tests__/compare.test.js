import { compare } from '../src/index.js';

test('compare', () => {
  const entries1 = [
    ['host', 'hexlet.io'],
    ['timeout', 50],
    ['proxy', '123.234.53.22'],
    ['follow', false],
  ];

  const entries2 = [
    ['timeout', 20],
    ['verbose', true],
    ['host', 'hexlet.io'],
  ];

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(compare(entries1, entries2)).toBe(expected);
});
