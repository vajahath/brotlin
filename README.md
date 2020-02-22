# brotlin

A handy CLI/API for [Brotli](https://github.com/google/brotli) compression based on [npm/brotli](https://www.npmjs.com/package/brotli).

![](https://github.com/vajahath/brotlin/workflows/Build/badge.svg) [![](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Install

Requires Node >=6.

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
brotli compress *

# same as above (all files matching *)
brotli compress

# single file
brotli compress index.html

# you've options (--help for more)
brotli compress style.css --quality 8 # default is 11
```

A new compressed file ending with `.br` will be created for every file feeding in to the CLI.

You can pass in a relative path or an absolute path or a glob pattern.

### `--help` for help

```bash
$ brotli --help
Usage: brotli [options] [command]

Options:
  -V, --version              output the version number
  -h, --help                 output usage information

Commands:
  compress [options] [file]  Creates a compressed file in the same location. Argument can be relative/absolute/glob
                             paths [default:*]
```

`--help` for `brotli compress` command:

```bash
$ brotli compress --help
Usage: brotli compress [options] [file]

Creates a compressed file in the same location. Argument can be relative/absolute/glob paths [default:*]

Options:
  -p, --parallel <count>  Processes <count> number of files in parallel. [default: 1]
  -m, --mode <number>     Brotli compression mode (0 = generic[default], 1 = text, 2 = font (WOFF2))
  -q, --quality <number>  Compression quality [0 - 11]. [default: 11]
  -w, --window <number>   Compression window size [default: 22]
  -h, --help              output usage information
```

### Example

Few examples

## APIs

API doc

[![](https://img.shields.io/badge/built%20with-ts--np%203-lightgrey?style=flat-square)](https://github.com/vajahath/generator-ts-np) <!--(TSNP VERSION: 3.2.0)-->

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
