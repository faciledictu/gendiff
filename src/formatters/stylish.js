import _ from 'lodash';

const spacer = '    ';
const removed = '  - ';
const added = '  + ';

const makeLine = (callback, key, rawValue, depth, mark = spacer) => {
  const indent = spacer.repeat(depth);
  const value = callback(rawValue, depth + 1);
  return `${indent}${mark}${key}: ${value}`;
};

const stringify = (value, depth) => {
  const indent = spacer.repeat(depth);

  if (_.isObject(value)) {
    const result = Object
      .entries(value)
      .map(([key, val]) => makeLine(stringify, key, val, depth));
    return [
      '{',
      ...result,
      `${indent}}`,
    ].join('\n');
  }

  return `${value}`;
};

export default (diff) => {
  const iter = (node, depth) => {
    const output = node.map((entry) => {
      const { key, type } = entry;

      switch (type) {
        case 'nest':
          return makeLine(iter, key, entry.children, depth);

        case 'removed':
          return makeLine(stringify, key, entry.value, depth, removed);

        case 'added':
          return makeLine(stringify, key, entry.value, depth, added);

        case 'unchanged':
          return makeLine(stringify, key, entry.value, depth);

        case 'changed':
          return [
            makeLine(stringify, key, entry.value1, depth, removed),
            makeLine(stringify, key, entry.value2, depth, added),
          ].join('\n');

        default:
          throw new Error(`Unable to parse the comparison result. Unknown entry type: "${type}"`);
      }
    });

    const indent = spacer.repeat(depth);
    return [
      '{',
      ...output,
      `${indent}}`,
    ].join('\n');
  };

  return iter(diff, 0);
};
