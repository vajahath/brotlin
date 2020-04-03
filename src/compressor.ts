import {
  getBrotliCompressor,
  IGetBrotliCompressorOpt
} from './brotli-native/compress';
import globby from 'globby';
import { toUnix } from 'upath';
import pLimit from 'p-limit';

/**
 * Main compression function
 * @param {IBrCompressor} opt compressor options
 */
export async function compressor(opt: IBrCompressor) {
  const brCompressor = getBrotliCompressor({
    mode: opt.mode,
    quality: opt.quality,
    windowSize: opt.windowSize
  });
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
      brCompressor(path).then(outFile => console.log(`created: ${outFile}`))
    )
  );

  await Promise.all(throttledPromises);
  return paths;
}

export type IBrCompressor = IGetBrotliCompressorOpt & {
  path: string;
  parallelJobCount?: number;
};
