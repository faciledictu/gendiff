import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keys1, keys2));
  const removedKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);

  const diff = allKeys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (removedKeys.includes(key)) {
      return {
        key,
        type: 'removed',
        oldValue,
      };
    }

    if (addedKeys.includes(key)) {
      return {
        key,
        type: 'added',
        newValue,
      };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'unchanged',
        value: oldValue,
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const children = compare(obj1[key], obj2[key]);
      return {
        key,
        type: 'nest',
        children,
      };
    }

    return {
      key,
      type: 'changed',
      oldValue,
      newValue,
    };
  });

  return diff;
};

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
