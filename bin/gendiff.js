#!/usr/bin/env node

/* eslint-disable no-console */

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, opts) => {
    try {
      const diff = genDiff(filepath1, filepath2, opts.format);
      console.log(diff);
    } catch (error) {
      console.error(error.message);
    }
  })
  .parse();
