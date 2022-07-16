import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format.toLowerCase()) {
    case '.json':
      return JSON.parse(file);

    case '.yaml':
    case '.yml':
      return yaml.load(file);

    default:
      throw new Error(`Unsupported file type: ${format}`);
  }
};

export default parse;
