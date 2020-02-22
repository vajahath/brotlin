import { createReadStream, createWriteStream } from 'fs';
import { Transform } from 'stream';
import globby from 'globby';
import pLimit from 'p-limit';
const br = require('brotli');
import { toUnix } from 'upath';

const brCompress = br.compress;
/**
 * Main compression handler function
 * @param {object} options
 */
export async function compression(options: ICompression) {
  // resolve paths
  const paths = await pathResolver(options.path);
  if (!paths) {
    throw new Error(`Couldn't resolve path: ${options.path}`);
  }

  const compressor = getCompressor({
    mode: options.mode,
    quality: options.quality
  });

  const throttle = pLimit(options.parallelJobCount || 1);

  const throttledPromises = paths.map(path =>
    throttle(() =>
      compressor(path).then(outFile => console.log(`created: ${outFile}`))
    )
  );

  await Promise.all(throttledPromises);
  return paths;
}

export type ICompression = IGetCompressor & {
  path: string;
  parallelJobCount?: number;
};

/**
 * Resolve paths based on type
 * @param {string} givenPath can be the relative/absolute/glob paths
 * @return {object} array of paths to the mentioned files
 */
async function pathResolver(givenPath: string) {
  try {
    const paths = await globby(toUnix(givenPath));
    return paths;
  } catch (err) {
    console.error(err);
  }
}

/**
 * The main compression function
 * @param {object} stuff
 * @return {function} compression function
 */
function getCompressor({
  mode = 0,
  quality = 11,
  windowSize = 22
}: IGetCompressor) {
  return (filePath: string) => {
    return new Promise((resolve, reject) => {
      const OUT_FILE = filePath + '.br';
      const reader = createReadStream(filePath);
      const writer = createWriteStream(OUT_FILE);

      const compressor = new Transform({
        async transform(chunk, enc, cb) {
          const compressed = await brCompress(chunk, {
            mode,
            quality,
            lgwin: windowSize
          });
          this.push(compressed);
          return cb();
        }
      });

      reader
        .pipe(compressor)
        .on('error', err => reject(err))
        .pipe(writer)
        .on('close', () => resolve(OUT_FILE));
    });
  };
}

interface IGetCompressor {
  mode?: number;
  quality?: number;
  windowSize?: number;
}
