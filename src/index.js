import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';
import parse from './parsers.js';

const compare = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const allKeys = _.sortBy(_.union(keys1, keys2));
  const removedKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);

  const diff = allKeys.map((key) => {
    if (removedKeys.includes(key)) {
      return {
        key,
        type: 'removed',
        oldValue: data1[key],
      };
    }

    if (addedKeys.includes(key)) {
      return {
        key,
        type: 'added',
        newValue: data2[key],
      };
    }

    if (data1[key] === data2[key]) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = compare(data1[key], data2[key]);
      return {
        key,
        type: 'nest',
        children,
      };
    }

    return {
      key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });

  return diff;
};

const stylish = (diff) => {
  const spacer = '    ';
  const removed = '  - ';
  const added = '  + ';
  const iter = (node, depth) => {
    const indent = spacer.repeat(depth);

    const stringify = (value, padding) => {
      if (_.isObject(value)) {
        const outsideIndent = spacer.repeat(padding);
        const result = Object
          .entries(value)
          .map(([key, val]) => `${outsideIndent}${spacer}${key}: ${stringify(val, padding + 1)}`);
        return [
          '{',
          ...result,
          `${outsideIndent}}`,
        ].join('\n');
      }

      return `${value}`;
    };

    const output = node.map((entry) => {
      switch (entry.type) {
        case 'nest':
          return `${indent}${spacer}${entry.key}: ${iter(entry.children, depth + 1)}`;

        case 'removed':
          return `${indent}${removed}${entry.key}: ${stringify(entry.oldValue, depth + 1)}`;

        case 'added':
          return `${indent}${added}${entry.key}: ${stringify(entry.newValue, depth + 1)}`;

        case 'unchanged':
          return `${indent}${spacer}${entry.key}: ${stringify(entry.value, depth + 1)}`;

        case 'changed':
          return [
            `${indent}${removed}${entry.key}: ${stringify(entry.oldValue, depth + 1)}`,
            `${indent}${added}${entry.key}: ${stringify(entry.newValue, depth + 1)}`,
          ].join('\n');

        default:
          throw new Error(`Unable to parse the comparison result. Unknown entry type: "${entry.type}"`);
      }
    });
    return [
      '{',
      ...output,
      `${indent}}`,
    ].join('\n');
  };

  return iter(diff, 0);
};

// const stringify = (diff, depth, marker) => {
//   const indent = spacer.repeat(depth);
//   const sortedDiff = _.sortBy(diff, 'key');
//   const output = sortedDiff.map((entry) => {
//     switch (entry.type) {
//       case 'nest':
//         return `${indent}${spacer}${entry.key}: ${stringify(entry.children, depth + 1)}`;

//       case 'removed':
//         return `${indent}${removed}${entry.key}: ${entry.oldValue}`;

//       case 'added':
//         return `${indent}${added}${entry.key}: ${entry.newValue}`;

//       case 'unchanged':
//         return `${indent}${spacer}${entry.key}: ${entry.value}`;

//       case 'changed':
//         return [
//           `${indent}${removed}${entry.key}: ${entry.oldValue}`,
//           `${indent}${added}${entry.key}: ${entry.newValue}`,
//         ].join('\n');

//       default:
//     throw new Error(`Unable to parse the comparison result. Unknown entry type: "${entry.type}`);
//     }
//   });
//   return [
//     '{',
//     ...output,
//     `${indent}}`,
//   ].join('\n');
// };

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  let format;
  switch (formatter) {
    case 'stylish':
      format = stylish;
      break;
    default:
      throw new Error(`Unsupported format: ${formatter}`);
  }

  const format1 = path.extname(filepath1);
  const file1 = fs.readFileSync(filepath1);
  const data1 = parse(file1, format1);

  const format2 = path.extname(filepath2);
  const file2 = fs.readFileSync(filepath2);
  const data2 = parse(file2, format2);

  const diff = compare(data1, data2);

  return format(diff);
};

export default genDiff;
