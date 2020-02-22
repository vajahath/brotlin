# brotlin

A handy CLI/API for [Brotli](https://github.com/google/brotli) compression based on [npm/brotli](https://www.npmjs.com/package/brotli). Helps you to convert files to Brotli(`.br`) format.

![](https://github.com/vajahath/brotlin/workflows/Build/badge.svg) [![](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Install

Requires Node >=8.

From npm,

```sh
npm i -g brotlin
```

From [Github Package Registry](https://github.com/vajahath/brotlin/packages). ([Guide](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages)).

Type definitions are bundled with this package.

## Usage

### Quick start

```bash
# cd to your dir
cd my-dir

# all files matching * glob pattern
brotlin compress *

# same as above (all files matching *)
brotlin compress

# single file
brotlin compress index.html

# you've options (--help for more)
brotlin compress style.css --quality 8 # default is 11
```

A new compressed file ending with `.br` will be created for every file feeding in to the CLI.

You can pass in a relative path or an absolute path or a glob pattern.

### `--help` for help

```bash
$ brotlin --help
Usage: brotlin [options] [command]

Options:
  -V, --version              output the version number
  -h, --help                 output usage information

Commands:
  compress [options] [file]  Creates a compressed file in the same location. Argument can be relative/absolute/glob
                             paths [default:*]. Check https://www.npmjs.com/package/brotli to know more about the
                             following options

```

`--help` for `brotlin compress` command:

```bash
$ brotlin compress --help
Usage: brotlin compress [options] [file]

Creates a compressed file in the same location. Argument can be relative/absolute/glob paths [default:*]. Check https://www.npmjs.com/package/brotli to know more about the following options

Options:
  -m, --mode <number>     Brotli compression mode (0 = generic[default], 1 = text, 2 = font (WOFF2))
  -q, --quality <number>  Compression quality [0 - 11]. [default: 11]
  -w, --window <number>   Compression window size [default: 22]
  -p, --parallel <count>  Processes <count> number of files in parallel. [default: 1]
  -h, --help              output usage information
```

For knowing more about these options, see [npm/brotli](https://www.npmjs.com/package/brotli).

### One more example

```bash
# compress all fils in the dist folder
cd dist # moved to dist
brotlin compress **/* # compress all files in the directory
```

## APIs

```ts
import { compression } from 'brotlin';
// or
const { compression } = require('brotlin');

compression({
  path: '*.html', // required
  parallelJobCount: 1, // optional
  mode: 0, // optional
  quality: 11, // optional
  windowSize: 22 // optional
}).then(files => console.log(`Compressed ${files.length} files`));
```

[![](https://img.shields.io/badge/built%20with-ts--np%203-lightgrey?style=flat-square)](https://github.com/vajahath/generator-ts-np) <!--(TSNP VERSION: 3.2.0)-->

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
