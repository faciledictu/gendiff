import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish formatter', () => {
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(expected);
});

test('plain formatter', () => {
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(expected);
  expect(genDiff(getFixturePath('file2.yml'), getFixturePath('file2.yml'), 'plain')).toBe('');
});

test('json formatter', () => {
  const expected = '[{"key":"common","type":"nest","children":[{"key":"follow","type":"added","newValue":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","oldValue":200},{"key":"setting3","type":"changed","oldValue":true,"newValue":null},{"key":"setting4","type":"added","newValue":"blah blah"},{"key":"setting5","type":"added","newValue":{"key5":"value5"}},{"key":"setting6","type":"nest","children":[{"key":"doge","type":"nest","children":[{"key":"wow","type":"changed","oldValue":"","newValue":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","newValue":"vops"}]}]},{"key":"group1","type":"nest","children":[{"key":"baz","type":"changed","oldValue":"bas","newValue":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","oldValue":{"key":"value"},"newValue":"str"}]},{"key":"group2","type":"removed","oldValue":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","newValue":{"deep":{"id":{"number":45}},"fee":100500}}]';
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expected);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(expected);
});
