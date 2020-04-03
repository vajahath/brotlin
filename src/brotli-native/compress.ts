// brotli compression natively added in node 11.7.0

import { constants as ZLIB_CONST, createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

const MODE_MAP: { [key in IBR_MODES]: number } = {
  generic: ZLIB_CONST.BROTLI_MODE_GENERIC,
  text: ZLIB_CONST.BROTLI_MODE_TEXT,
  woff2: ZLIB_CONST.BROTLI_MODE_FONT
};

/**
 * The main compression function
 * @param {object} stuff
 * @return {function} compression function
 */
export function getBrotliCompressor({
  mode = 'generic',
  quality = ZLIB_CONST.BROTLI_DEFAULT_QUALITY,
  windowSize = ZLIB_CONST.BROTLI_DEFAULT_WINDOW
}: IGetBrotliCompressorOpt) {
  return (filePath: string) => {
    const brCompressionPipe = createBrotliCompress({
      params: {
        [ZLIB_CONST.BROTLI_PARAM_MODE]: MODE_MAP[mode],
        [ZLIB_CONST.BROTLI_PARAM_QUALITY]: quality,
        [ZLIB_CONST.BROTLI_PARAM_LGWIN]: windowSize
      }
    });
    return new Promise(resolve => {
      const OUT_FILE = filePath + '.br';

      const reader = createReadStream(filePath);
      const writer = createWriteStream(OUT_FILE);

      reader
        .pipe(brCompressionPipe)
        .pipe(writer)
        .on('close', () => resolve(OUT_FILE));
    });
  };
}

type IBR_MODES = 'generic' | 'text' | 'woff2';

export interface IGetBrotliCompressorOpt {
  mode?: IBR_MODES;
  quality?: number;
  windowSize?: number;
}
