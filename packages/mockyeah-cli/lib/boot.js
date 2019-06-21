'use strict';

/* eslint-disable no-console, no-process-exit, no-sync */

const Liftoff = require('liftoff');
const v8flags = require('v8flags');
const chalk = require('chalk');
const readPkgUp = require('read-pkg-up');

const liftoff = new Liftoff({
  name: 'mockyeah',
  configName: '.mockyeah',
  extensions: {},
  v8flags
});

const checkVersionMatchWithPackage = (env, pkgUp) => {
  if (!pkgUp || !pkgUp.package || !pkgUp.package.version) {
    throw new Error(
      chalk.red('Could not find `mockyeah-cli` package version to check against core.')
    );
  }

  if (!env.modulePackage || !env.modulePackage.version) {
    throw new Error(chalk.red('Could not find `mockyeah` package version to check against CLI.'));
  }

  const cliVersion = pkgUp.package.version;
  const coreVersion = env.modulePackage.version;

  if (cliVersion !== coreVersion) {
    throw new Error(
      chalk.red(
        `Version mismatch between CLI (${cliVersion}) and core (${coreVersion}) - please install same versions.`
      )
    );
  }
};

const checkVersionMatch = env => {
  const pkgUp = readPkgUp.sync({
    cwd: __dirname
  });

  checkVersionMatchWithPackage(env, pkgUp);
};

function boot(callback) {
  liftoff.launch({}, env => {
    // check for local mockyeah
    if (!env.modulePath) {
      console.log(chalk.red(`Local mockyeah not found in ${env.cwd}`));
      console.log(chalk.red('Try running: npm install mockyeah --save-dev'));
      process.exit(1);
    }

    checkVersionMatch(env);

    // eslint-disable-next-line global-require
    env.config = require('./config')(env);

    // TODO: Implement support for HTTPS admin server protocol.

    const { adminProtocol, adminHost, adminPort } = env.config;

    env.adminUrl = `${adminProtocol}://${adminHost}:${adminPort}`;

    callback.call(this, env);
  });
}

boot.checkVersionMatchWithPackage = checkVersionMatchWithPackage;

module.exports = boot;
