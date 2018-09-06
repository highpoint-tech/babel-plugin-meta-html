const { execSync } = require('child_process');
const { clearStaleCache, getFromCache, storeInCache } = require('./cache');
const metaHTML = require('./meta-html');

const request = require.resolve('./request');
const toFind = new RegExp(`^(${metaHTML.join('|')})`);

module.exports = (babel, { opts = {} }) => {
  const useCache = opts.cacheDirectory !== false;
  if (useCache) {
    clearStaleCache(opts);
  }
  return {
    visitor: {
      StringLiteral(path) {
        if (!toFind.test(path.node.value)) return;

        let replacement = null;

        if (useCache) {
          replacement = getFromCache(path.node.value, opts);
        }

        if (replacement === null) {
          // Because Babel does not support asynchronous visitors, the HTTP request
          // needs to be made by a blocking child.
          replacement = execSync(
            `node ${request} "${path.node.value}"`
          ).toString();

          if (useCache) {
            storeInCache(path.node.value, replacement, opts);
          }
        }

        path.node.value = replacement;
      }
    }
  };
};
