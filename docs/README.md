# Sudoo-Dump

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Dump/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Dump/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Dump/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Dump)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fdump.svg)](https://www.npmjs.com/package/@sudoo/dump)
[![downloads](https://img.shields.io/npm/dm/@sudoo/dump.svg)](https://www.npmjs.com/package/@sudoo/dump)

A Dump of things

## Install

```sh
yarn add @sudoo/dump
# Or
npm install @sudoo/dump --save
```

## Usage

```ts
import { Dump } from "@sudoo/dump";

const dump: Dump<number> = await Dump.create('unique-name', 0).
```

To change the value, just use the following code example:

```ts
dump.replace(1);
```
