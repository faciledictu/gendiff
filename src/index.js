import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import compare from './comparer.js';
import format from './formatters/index.js';

const parseFromFile = (filepath) => {
  const extension = path.extname(filepath);
  const type = extension[0] === '.' ? extension.slice(1) : extension;

  const file = readFileSync(filepath);

  const obj = parse(file, type);
  return obj;
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parseFromFile(filepath1);
  const obj2 = parseFromFile(filepath2);
  const diff = compare(obj1, obj2);

  return format(diff, formatter);
};

export default genDiff;
