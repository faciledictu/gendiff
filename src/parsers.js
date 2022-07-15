import yaml from 'js-yaml';

const parse = (file, format) => {
  let parseData;
  switch (format) {
    case '.json':
      parseData = JSON.parse;
      break;

    case '.yaml':
    case '.yml':
      parseData = yaml.load;
      break;

    default:
      throw new Error(`Unsupported data type: ${format}`);
  }

  const obj = parseData(file);

  return obj;
};

export default parse;
