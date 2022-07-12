import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import parse from '../src/parsers.js';

const entries = [
  { key: 'host', value: 'hexlet.io' },
  { key: 'timeout', value: 50 },
  { key: 'proxy', value: '123.234.53.22' },
  { key: 'follow', value: false },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parse json', () => {
  const jsonFile = readFileSync(getFixturePath('file1.json'));
  expect(parse(jsonFile, '.json')).toEqual(entries);
});

test('parse yaml', () => {
  const yamlFile = readFileSync(getFixturePath('file1.yml'));
  expect(parse(yamlFile, '.yaml')).toEqual(entries);
});

test('unsupported format', () => {
  expect(() => {
    parse(getFixturePath('file1.txt'));
  }).toThrow();
});
