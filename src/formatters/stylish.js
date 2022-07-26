import _ from 'lodash';

const spacer = '    ';
const removed = '  - ';
const added = '  + ';

const stringify = (value, depth) => {
  const indent = spacer.repeat(depth);

  if (_.isObject(value)) {
    const result = Object
      .entries(value)
      .map(([key, val]) => `${indent}${spacer}${key}: ${stringify(val, depth + 1)}`);
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
    const indent = spacer.repeat(depth);

    const output = node.map((entry) => {
      const { key, type } = entry;

      switch (type) {
        case 'nest':
          return `${indent}${spacer}${key}: ${iter(entry.children, depth + 1)}`;

        case 'removed':
          return `${indent}${removed}${key}: ${stringify(entry.value, depth + 1)}`;

        case 'added':
          return `${indent}${added}${key}: ${stringify(entry.value, depth + 1)}`;

        case 'unchanged':
          return `${indent}${spacer}${key}: ${stringify(entry.value, depth + 1)}`;

        case 'changed':
          return [
            `${indent}${removed}${key}: ${stringify(entry.value1, depth + 1)}`,
            `${indent}${added}${key}: ${stringify(entry.value2, depth + 1)}`,
          ].join('\n');

        default:
          throw new Error(`Unable to parse the comparison result. Unknown entry type: "${type}"`);
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
