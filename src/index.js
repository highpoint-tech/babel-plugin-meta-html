const { execSync } = require('child_process');
const metaHTML = require('./meta-html');

const request = require.resolve('./request');
const toFind = new RegExp(`^(${metaHTML.join('|')})`);

module.exports = () => ({
  visitor: {
    StringLiteral(path) {
      if (!toFind.test(path.node.value)) return;

      // Because Babel does not support asynchronous visitors, the HTTP request
      // needs to be made by a blocking child.
      path.node.value = execSync(
        `node ${request} "${path.node.value}"`
      ).toString();
    }
  }
});
