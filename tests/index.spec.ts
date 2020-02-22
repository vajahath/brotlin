/**
 * Loading from /dist because this actually
 * gives you the ability to test the exact
 * code getting published. You can also check the typings this way.
 */

import { compression } from '../dist/index';
import { join, toUnix } from 'upath';
import { existsSync } from 'fs';

describe('Testing compressor', () => {
  test('should compress files', async () => {
    // .js because, .ts tests will be compiled to .js
    const input = toUnix(join(__dirname, 'index.spec.js'));
    const op = input + '.br';

    console.log({ input, op });

    await compression({ path: input });
    expect(existsSync(op)).toBeTruthy();
  });
});
