# gendiff

[![Actions Status](https://github.com/faciledictu/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/faciledictu/frontend-project-lvl2/actions)
[![Node CI](https://github.com/faciledictu/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/faciledictu/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/4d7aaf8e60876fe02041/maintainability)](https://codeclimate.com/github/faciledictu/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4d7aaf8e60876fe02041/test_coverage)](https://codeclimate.com/github/faciledictu/frontend-project-lvl2/test_coverage)

Hexlet Study Project, Level 2

## About

Compares two configuration files and shows a difference. The tool supports JSON and YAML files and shows result in several text output formats.

## Getting Started

### Install

1. Clone the repo

```sh
git clone https://github.com/faciledictu/frontend-project-lvl2.git
```

2. Install dependencies

```sh
make install
```

3. If you want to compare files from CLI, make links

```sh
make link
```

## Usage

### CLI executable

```sh
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

### Javascipt module

```javascript
genDiff(filepath1, filepath2)
genDiff(filepath1, filepath2, format)
```

Options:

- `filepath1`, `filepath2`

  Strings to be used as file paths

- `format` _(optional)_ — output format:
  - `stylish` _(default)_: shows the changes as a tree
  - `plain` shows a list of changes
  - `json` returns a JSON string

### Examples

#### Comparing two JSON files

[![asciicast](https://asciinema.org/a/MABjX1zeQHSBWrrfWDIkesxOq.svg)](https://asciinema.org/a/MABjX1zeQHSBWrrfWDIkesxOq)

#### Comparing two YAML files

[![asciicast](https://asciinema.org/a/uKizy1fzx3QhUGiwQ2fNBe27Q.svg)](https://asciinema.org/a/uKizy1fzx3QhUGiwQ2fNBe27Q)

#### Formatters

##### Stylish

[![asciicast](https://asciinema.org/a/oDWGFot1V9Il3pMiuUY7nCQOw.svg)](https://asciinema.org/a/oDWGFot1V9Il3pMiuUY7nCQOw)

##### Plain

[![asciicast](https://asciinema.org/a/rdM51w6JuZNU2fnaRCH5CGu4q.svg)](https://asciinema.org/a/rdM51w6JuZNU2fnaRCH5CGu4q)

##### JSON

[![asciicast](https://asciinema.org/a/EJsG0QwGEnxo7P3UHTcgVcBy7.svg)](https://asciinema.org/a/EJsG0QwGEnxo7P3UHTcgVcBy7)
