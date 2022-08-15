#! /usr/bin/env node

import { Command } from 'commander';

import { validateDomain } from './src/domain.js';

const program = new Command();

program.name('analytics')
  .description('CLI to validate analytics on a website')
  .version('0.0.1');

program.command('validate')
  .description('Validate a given domain')
  .argument('<hostname>', 'Domain to validate')
  .option('--url <urls>', 'URLs to validate')
  .option('--filter <filter>', 'Filter to exclude from the validation')
  .option('--launch-headless <launch-headless>', 'Launch headless browser')
  .option('--write-to-file <write-to-file>', 'Write to file')
  // .option('--block-requests <block-requests>', 'Block requests') //not working
  .option('--data-layer-name <data-layer-name>', 'Data layer name')
  .action((hostname, options) => {
    validateDomain({ hostname, ...options, urls: options.url ? [options.url] : null });
  });


program.parse();
