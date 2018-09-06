const fs = require('fs');
const mkdirp = require('mkdirp');
const { promisify } = require('util');

module.exports = {
  readdir: promisify(fs.readdir),
  mkdirp: promisify(mkdirp),
  stat: promisify(fs.stat),
  unlink: promisify(fs.unlink),
  writeFile: promisify(fs.writeFile)
};
