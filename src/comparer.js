import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.sortBy(_.union(keys1, keys2));
  const removedKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);

  const diff = allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (removedKeys.includes(key)) {
      return { key, type: 'removed', value: value1 };
    }

    if (addedKeys.includes(key)) {
      return { key, type: 'added', value: value2 };
    }

    if (_.isEqual(value1, value2)) {
      return { key, type: 'unchanged', value: value1 };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      const children = compare(value1, value2);
      return { key, type: 'nest', children };
    }

    return {
      key,
      type: 'changed',
      value1,
      value2,
    };
  });

  return diff;
};

export default compare;
