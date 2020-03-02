import { getBrotliDecompressor } from './brotli-native/decompress';
import globby from 'globby';
import { toUnix } from 'upath';
import pLimit from 'p-limit';

/**
 * Main decompression function
 * @param {IBrCompressor} opt compressor options
 */
export async function decompressor(opt: IBrDecompressor) {
  const brDecompressor = getBrotliDecompressor();
  const paths = await globby(toUnix(opt.path));

  if (!paths) {
    throw new Error(`Couldn't resolve path: ${opt.path}`);
  }
  if (!paths.length) {
    throw new Error(`No matching paths found for: ${opt.path}`);
  }

  const throttle = pLimit(opt.parallelJobCount || 1);
  const throttledPromises = paths.map(path =>
    throttle(() =>
      brDecompressor(path).then(outFile => console.log(`created: ${outFile}`))
    )
  );

  await Promise.all(throttledPromises);
  return paths;
}

export type IBrDecompressor = {
  path: string;
  parallelJobCount?: number;
};
