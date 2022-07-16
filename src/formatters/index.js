import formatAsStylish from './stylish.js';
import formatAsPlain from './plain.js';

const format = (diff, formatter) => {
  switch (formatter.toLowerCase()) {
    case 'stylish':
      return formatAsStylish(diff);

    case 'plain':
      return formatAsPlain(diff);

    case 'json':
      return JSON.stringify(diff);

    default:
      throw new Error(`Unsupported output format: ${formatter}`);
  }
};

export default format;
