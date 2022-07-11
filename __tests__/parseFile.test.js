import { parseFile } from '../src/index.js';

const entries = [
  ['host', 'hexlet.io'],
  ['timeout', 50],
  ['proxy', '123.234.53.22'],
  ['follow', false],
];

test('relative path', () => {
  expect(parseFile('__fixtures__/file1.json')).toEqual(entries);
});

test('absolute path', () => {
  expect(parseFile('/Users/dmitrijzigulin/Coding/frontend-project-lvl2/__fixtures__/file1.json')).toEqual(entries);
});

test('unsupported extension', () => {
  expect(() => {
    parseFile('__fixtures__/file1.jsn');
  }).toThrow();
});
