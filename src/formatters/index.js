import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatter) => {
  switch (formatter.toLowerCase()) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unsupported output format: ${formatter}`);
  }
};

export default format;
