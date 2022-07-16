import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return `${value}`;
};

const plain = (diff) => {
  const iter = (node, path) => {
    const output = node
      .map((entry) => {
        const currentPath = `${path}${entry.key}`;
        switch (entry.type) {
          case 'nest':
            return iter(entry.children, `${currentPath}.`);

          case 'removed':
            return `Property '${currentPath}' was removed`;

          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(entry.newValue)}`;

          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(entry.oldValue)} to ${stringify(entry.newValue)}`;

          case 'unchanged':
            return [];

          default:
            throw new Error(`Unable to parse the comparison result. Unknown entry type: "${entry.type}"`);
        }
      });
    return output.flat();
  };
  return iter(diff, '').join('\n');
};

export default plain;
