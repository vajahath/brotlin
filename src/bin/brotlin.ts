#!/usr/bin/env node

import '../update-notifier';

import program from 'commander';
import convertHrtime from 'convert-hrtime';
import { compressor, decompressor } from '../index';

const version = require('../../package.json').version;
program.version(version);

program
  .command('compress <file>')
  .description(
    'Creates a compressed file in the same location. Argument can be relative/absolute/glob paths [default:*].'
  )
  .option(
    '-m, --mode <generic|text|woff2>',
    'Brotli compression mode [default: generic]',
    val => {
      const possibleValues = ['generic', 'text', 'woff2'];
      if (!possibleValues.includes(val)) {
        throw new Error(
          `'mode' option must be one of (${possibleValues.join(
            ','
          )}). Gotten: ${val}`
        );
      }
    }
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
    `Processes <count> number of files in parallel. [default: 1]`,
    val => +val
  )
  .action(async (file, cmdObj) => {
    if (!file) {
      console.log(
        '[ERR] Please specify file|glob pattern to compress. (Use quotes for "<glob>")'
      );
      process.exitCode = 1;
      return;
    }
    const start = process.hrtime();
    const compressedFiles = await compressor({
      path: file,
      parallelJobCount: cmdObj.parallel,
      mode: cmdObj.mode,
      quality: cmdObj.quality,
      windowSize: cmdObj.window
    });

    console.log(
      `\n[brotlin] Processed ${compressedFiles.length} files in ${Math.round(
        (convertHrtime(process.hrtime(start)).seconds + Number.EPSILON) * 100
      ) / 100} secs`
    );
  });

program
  .command('decompress <file>')
  .description(
    'Creates a decompressed file in the same location. Argument can be relative/absolute/glob paths [default:*].'
  )
  .option(
    '-p, --parallel <count>',
    `Processes <count> number of files in parallel. [default: 1]`,
    val => +val
  )
  .action(async (file, cmdObj) => {
    if (!file) {
      console.log(
        '[ERR] Please specify file|glob pattern to compress. (Use quotes for "<glob>")'
      );
      process.exitCode = 1;
      return;
    }

    const start = process.hrtime();
    const decompressedFiles = await decompressor({
      path: file || '*',
      parallelJobCount: cmdObj.parallel
    });
    console.log(
      `\n[brotlin] Processed ${decompressedFiles.length} files in ${Math.round(
        (convertHrtime(process.hrtime(start)).seconds + Number.EPSILON) * 100
      ) / 100} secs`
    );
  });

program.parse(process.argv);
