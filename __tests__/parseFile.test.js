import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parseFile } from '../src/index.js';

const entries = [
  ['host', 'hexlet.io'],
  ['timeout', 50],
  ['proxy', '123.234.53.22'],
  ['follow', false],
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('relative path', () => {
  expect(parseFile('__fixtures__/file1.json')).toEqual(entries);
});

test('absolute path', () => {
  expect(parseFile(getFixturePath('file1.json'))).toEqual(entries);
});

test('unsupported extension', () => {
  expect(() => {
    parseFile(getFixturePath('file1.txt'));
  }).toThrow();
});
