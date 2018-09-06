const crypto = require('crypto');
const findCacheDir = require('find-cache-dir');
const { lstatSync, readFileSync, unlinkSync } = require('fs');
const os = require('os');
const path = require('path');
const { readdir, mkdirp, stat, unlink, writeFile } = require('./fs');

const ttl = 30 * 60; // 30 minutes
const now = new Date().getTime();

let defaultCacheDirectory = null;

const getCacheTTL = ({ cacheTTL = ttl }) => cacheTTL * 1000;

const getCacheDirectory = ({ cacheDirectory }) => {
  if (typeof cacheDirectory === 'string') {
    return cacheDirectory;
  }
  if (defaultCacheDirectory === null) {
    defaultCacheDirectory =
      findCacheDir({
        name: 'babel-plugin-meta-html'
      }) || os.tmpdir();
  }
  return defaultCacheDirectory;
};

const generateFilename = (key, opts) => {
  const hash = crypto.createHash('md4');
  const contents = JSON.stringify({
    key,
    opts
  });
  hash.update(contents);
  return hash.digest('hex');
};

const getFromCache = (key, opts) => {
  const filePath = path.join(
    getCacheDirectory(opts),
    generateFilename(key, opts)
  );
  let stats;
  try {
    stats = lstatSync(filePath);
  } catch (e) {
    return null;
  }
  // Check for stale cache
  const expiration = new Date(stats.mtime).getTime() + getCacheTTL(opts);
  if (now > expiration) {
    unlinkSync(filePath);
    return null;
  }
  return readFileSync(filePath, 'utf8');
};

const storeInCache = async (key, value, opts) => {
  try {
    const directory = getCacheDirectory(opts);
    const filePath = path.join(directory, generateFilename(key, opts));
    await mkdirp(directory);
    await writeFile(filePath, value);
  } catch (e) {
    console.error(e);
  }
};

const clearStaleCache = async opts => {
  const directory = getCacheDirectory(opts);
  const cacheTTL = getCacheTTL(opts);
  try {
    const files = await readdir(directory);
    files.forEach(async file => {
      try {
        const stats = await stat(path.join(directory, file));
        const expiration = new Date(stats.mtime).getTime() + cacheTTL;
        if (now > expiration) {
          await unlink(path.join(directory, file));
        }
      } catch (e) {
        /* do nothing */
      }
    });
  } catch (e) {
    /* do nothing */
  }
};

module.exports = {
  getFromCache,
  storeInCache,
  clearStaleCache
};
