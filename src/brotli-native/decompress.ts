// brotli compression natively added in node 11.7.0

import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { parse as pathParse } from 'path';

/**
 * The main decompression function
 * @param {object} stuff
 * @return {function} compression function
 */
export function getBrotliDecompressor() {
  return (filePath: string) => {
    const brDecompressionPipe = createBrotliDecompress();
    return new Promise((resolve, reject) => {
      // validation: file must me brotli compressed
      {
        const { ext } = pathParse(filePath);
        if (ext !== '.br') {
          return reject(
            new Error(`Brotli decompressor got a non-brotli file ${filePath}`)
          );
        }
      }

      const OUT_FILE = filePath.substr(0, filePath.lastIndexOf('.'));

      const reader = createReadStream(filePath);
      const writer = createWriteStream(OUT_FILE);

      reader
        .pipe(brDecompressionPipe)
        .pipe(writer)
        .on('close', () => resolve(OUT_FILE))
        .on('error', err => reject(err));
    });
  };
}
