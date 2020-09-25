# Sudoo-Dump

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Dump.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Dump)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Dump/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Dump)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fdump.svg)](https://www.npmjs.com/package/@sudoo/dump)
[![downloads](https://img.shields.io/npm/dm/@sudoo/dump.svg)](https://www.npmjs.com/package/@sudoo/dump)

:ear_of_rice: A Dump of things

## Usage

```ts
import { Dump } from "@sudoo/dump";

const dump: Dump<number> = await Dump.create('unique-name', 0).
```

To change the value, just use the following code example:

```ts
dump.replace(1);
```
