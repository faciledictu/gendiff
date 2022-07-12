import yaml from 'js-yaml';

const selectParser = (format) => {
  switch (format) {
    case '.json':
      return JSON.parse;

    case '.yaml':
    case '.yml':
      return yaml.load;

    default:
      throw new Error('Unsupported file type');
  }
};

const parse = (file, format) => {
  const parseData = selectParser(format);

  const obj = parseData(file);
  const entries = Object
    .entries(obj)
    .map((entry) => ({ key: entry[0], value: entry[1] }));

  return entries;
};

export default parse;
