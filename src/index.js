import fs from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import compare from './comparer.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const format1 = path.extname(filepath1);
  const file1 = fs.readFileSync(filepath1);
  const obj1 = parse(file1, format1);

  const format2 = path.extname(filepath2);
  const file2 = fs.readFileSync(filepath2);
  const obj2 = parse(file2, format2);

  const diff = compare(obj1, obj2);

  return format(diff, formatter);
};

export default genDiff;
