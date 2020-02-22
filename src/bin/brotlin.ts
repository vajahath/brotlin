#!/usr/bin/env node

import '../update-notifier';

import program from 'commander';
import convertHrtime from 'convert-hrtime';
import { compression } from '../index';

const version = require('../../package.json').version;
program.version(version);

program
  .command('compress [file]')
  .description(
    'Creates a compressed file in the same location. Argument can be relative/absolute/glob paths [default:*]'
  )
  .option(
    '-m, --mode <number>',
    'Brotli compression mode (0 = generic[default], 1 = text, 2 = font (WOFF2))',
    val => +val
  )
  .option(
    '-q, --quality <number>',
    'Compression quality [0 - 11]. [default: 11]',
    val => +val
  )
  .option(
    '-w, --window <number>',
    'Compression window size [default: 22]',
    val => +val
  )
  .option(
    '-p, --parallel <count>',
    `Processes <count> number of files in parallel. [default: 1, sufficient for most cases]`,
    val => +val
  )
  .action(async (file, cmdObj) => {
    const start = process.hrtime();
    const numberOfFiles = await compression({
      givenPath: file || '*',
      parallelJobCount: cmdObj.parallel,
      mode: cmdObj.mode,
      quality: cmdObj.quality,
      windowSize: cmdObj.window
    });
    console.log(
      `\n[brotlin] Processed ${numberOfFiles} files in ${Math.round(
        (convertHrtime(process.hrtime(start)).seconds + Number.EPSILON) * 100
      ) / 100} secs`
    );
  });

program.parse(process.argv);
