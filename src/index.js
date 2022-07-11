import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';

export const compare = (entries1, entries2) => {
  const removedEntries = _
    .differenceWith(entries1, entries2, _.isEqual)
    .map((entry) => ['-', ...entry]);

  const addedEntries = _
    .differenceWith(entries2, entries1, _.isEqual)
    .map((entry) => ['+', ...entry]);

  const unmodifiedEntries = _
    .intersectionWith(entries1, entries2, _.isEqual)
    .map((entry) => [' ', ...entry]);

  const resultEntries = _.sortBy([
    ...removedEntries,
    ...addedEntries,
    ...unmodifiedEntries,
  ], 1);

  const result = resultEntries.map((entry) => `${entry[0]} ${entry[1]}: ${entry[2]}`);
  return `{
  ${result.join('\n  ')}
}`;
};

export const parseFile = (filepath) => {
  const extension = path.extname(filepath);
  if (extension === '.json') {
    const file = fs.readFileSync(filepath);
    const obj = JSON.parse(file);
    const entries = Object.entries(obj);
    return entries;
  }

  throw new Error('Unsupported file type');
};

const genDiff = (filepath1, filepath2) => {
  const entries1 = parseFile(filepath1);
  const entries2 = parseFile(filepath2);
  return compare(entries1, entries2);
};

export default genDiff;
