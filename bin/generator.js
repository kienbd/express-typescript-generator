#!/usr/bin/env node
process.env['NODE_CONFIG_DIR'] = __dirname;

const path = require('path');
const fs = require('fs-extra');
const program = require('commander');
const pkg = require('../package.json');

const TEMPLATE_DIR = path.resolve(__dirname, '..', 'templates');
const VERSION = pkg.version;

function sanitize(appName) {
  return appName
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase();
}

function validate() {
  if(!program.appName) program.help();
  program.appName = sanitize(program.appName);
}

function bootstrap() {
  program.name(`npx ${pkg.name}`)
    .version(VERSION)
    .usage('<app-name>')
    .parse(process.argv);

  program.appName = program.args[0];
}

function main() {
  const { appName } = program;
  const destinationPath = path.resolve(process.cwd(), appName);
  fs.mkdirp(destinationPath)
    .then(_ => fs.copy(TEMPLATE_DIR, destinationPath))
    .then(_ => console.log('Done!'))
    .catch(error => { 
      fs.remove(destinationPath);
      console.log('Error creating app', error);
    });
}

bootstrap();
validate();
main();
