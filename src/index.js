import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';
import parse from './parsers.js';

const compare = (entries1, entries2) => {
  const removedEntries = _
    .differenceWith(entries1, entries2, _.isEqual)
    .map((entry) => ({ flag: '-', ...entry }));

  const addedEntries = _
    .differenceWith(entries2, entries1, _.isEqual)
    .map((entry) => ({ flag: '+', ...entry }));

  const unmodifiedEntries = _
    .intersectionWith(entries1, entries2, _.isEqual)
    .map((entry) => ({ flag: ' ', ...entry }));

  const resultEntries = _.sortBy([
    ...removedEntries,
    ...addedEntries,
    ...unmodifiedEntries,
  ], 'key');

  const result = resultEntries.map((entry) => `${entry.flag} ${entry.key}: ${entry.value}`);
  return `{
  ${result.join('\n  ')}
}`;
};

const genDiff = (filepath1, filepath2) => {
  const format1 = path.extname(filepath1);
  const file1 = fs.readFileSync(filepath1);
  const entries1 = parse(file1, format1);

  const format2 = path.extname(filepath2);
  const file2 = fs.readFileSync(filepath2);
  const entries2 = parse(file2, format2);

  return compare(entries1, entries2);
};

export default genDiff;
