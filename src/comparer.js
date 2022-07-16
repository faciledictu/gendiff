import _ from 'lodash';

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
      return { key, type: 'removed', oldValue };
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

    return { key,
      type: 'changed',
      oldValue,
      newValue,
    };
  });

  return diff;
};

export default compare;
