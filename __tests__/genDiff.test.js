import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedOutput = {
  stylish: `{
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
}`,

  plain: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,

  json: '[{"key":"common","type":"nest","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"changed","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nest","children":[{"key":"doge","type":"nest","children":[{"key":"wow","type":"changed","value1":"","value2":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nest","children":[{"key":"baz","type":"changed","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]',
};

describe.each(['stylish', 'json'])('%s formatter', (formatter) => {
  test.each(['json', 'yml'])('%s files', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    const expected = expectedOutput[formatter];

    const result = genDiff(filepath1, filepath2, formatter);

    expect(result).toBe(expected);
  });
});

describe('plain formatter', () => {
  test.each([
    {
      file1: 'file1.json',
      file2: 'file2.json',
      description: 'json files',
      expected: expectedOutput.plain,
    },
    {
      file1: 'file1.yml',
      file2: 'file2.yml',
      description: 'yaml files',
      expected: expectedOutput.plain,
    },
    {
      file1: 'file1.json',
      file2: 'file1.json',
      description: 'identical files',
      expected: '',
    },
  ])('$description', ({ file1, file2, expected }) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);

    const result = genDiff(filepath1, filepath2, 'plain');

    expect(result).toBe(expected);
  });
});
