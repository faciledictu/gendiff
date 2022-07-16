import _ from 'lodash';

const spacer = '    ';
const removed = '  - ';
const added = '  + ';

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

const stylish = (diff) => {
  const iter = (node, depth) => {
    const indent = spacer.repeat(depth);
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

export default stylish;
