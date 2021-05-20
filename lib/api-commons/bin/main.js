#!/usr/bin/env node
require('ts-node').register({});
const { join } = require('path');
const { readFileSync } = require('fs');
const { PWD } = process.env;
const rc = JSON.parse(
    readFileSync(join(PWD, '.graphrc'))
);
require(join(PWD, rc.main));
