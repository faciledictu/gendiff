import yaml from 'js-yaml';

const parse = (data, type) => {
  switch (type.toLowerCase()) {
    case 'json':
      return JSON.parse(data);

    case 'yaml':
    case 'yml':
      return yaml.load(data);

    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
};

export default parse;
