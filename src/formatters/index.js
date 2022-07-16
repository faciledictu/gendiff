import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unsupported output format: ${formatter}`);
  }
};

export default format;
