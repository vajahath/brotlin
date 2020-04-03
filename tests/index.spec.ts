/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */

import { compressor, decompressor } from '../dist/index';
import { join, toUnix } from 'upath';
import { existsSync, readFileSync } from 'fs';

describe('Testing compressor', () => {
  test('big test file', async () => {
    // .js because, .ts tests will be compiled to .js
    const input = toUnix(join(__dirname, 'big-test-file.txt'));
    const content = readFileSync(input).toString();

    const op = input + '.br';

    await compressor({ path: input });

    expect(existsSync(op)).toBeTruthy();

    await decompressor({ path: op });

    const readContent = readFileSync(input).toString();

    expect(content).toBe(readContent);
  }, 10000);

  test('small-test-file', async () => {
    // .js because, .ts tests will be compiled to .js
    const input = toUnix(join(__dirname, 'small-test-file.txt'));
    const content = readFileSync(input).toString();

    const op = input + '.br';

    await compressor({ path: input });

    expect(existsSync(op)).toBeTruthy();

    await decompressor({ path: op });

    const readContent = readFileSync(input).toString();

    expect(content).toBe(readContent);
  }, 10000);

  test('tiny-test-file', async () => {
    // .js because, .ts tests will be compiled to .js
    const input = toUnix(join(__dirname, 'tiny-test-file.txt'));
    const content = readFileSync(input).toString();

    const op = input + '.br';

    await compressor({ path: input });

    expect(existsSync(op)).toBeTruthy();

    await decompressor({ path: op });

    const readContent = readFileSync(input).toString();

    expect(content).toBe(readContent);
  }, 10000);
});
