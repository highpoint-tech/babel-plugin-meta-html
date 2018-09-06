const babel = require('@babel/core');
const { expect } = require('chai');
const path = require('path');

require('dotenv').config({ silent: true });

const pluginPath = require.resolve('../src');

const { PS_ENVIRONMENT } = process.env;

const transform = (code, opts = {}) =>
  babel.transformSync(code, {
    plugins: [[pluginPath, opts]]
  }).code;

describe('index', function test() {
  this.timeout(5000);

  describe('ignore strings', () => {
    it('ignores string', () => {
      const code = "const string = 'string';";
      expect(transform(code)).to.equal(code);
    });

    it('ignores meta-HTML when not at start of string', () => {
      const code = "const string = 'a %URL';";
      expect(transform(code)).to.equal(code);
    });
  });

  describe('%ContentReference', () => {
    it('populates %ContentReference', () => {
      const code =
        "const url = '%ContentReference(EMPLOYEE, PT_PTFP_VIEW_GBL, psp)';";
      expect(transform(code)).to.match(/https?:\/\//);
    });
    it('use custom cache directory', () => {
      const code =
        "const url = '%ContentReference(EMPLOYEE, PT_PTFP_VIEW_GBL, psp)';";
      const opts = {
        cacheDirectory: path.resolve(__dirname, '../tmp')
      };
      expect(transform(code, opts)).to.match(/https?:\/\//);
    });
  });

  describe('%DBName', () => {
    it('populates %DBName', () => {
      const code = "const database = '%DBName';";
      const opts = {
        cacheTTL: 30
      };
      expect(transform(code, opts)).to.include(PS_ENVIRONMENT.toUpperCase());
    });
  });

  describe('%DBType', () => {
    it('populates %DBType', () => {
      const code = "const database = '%DBType';";
      expect(transform(code)).to.match(/(DB2|DB2UNIX|MICROSFT|ORACLE)/);
    });
  });

  describe('%ExplainMessage', () => {
    it('populates %ExplainMessage', () => {
      const code = "const database = '%ExplainMessage(2, 10)';";
      expect(transform(code)).to.include('push button');
    });
  });

  describe('%Message', () => {
    it('populates %Message', () => {
      const code = "const database = '%Message(2, 10)';";
      expect(transform(code)).to.include('push button');
    });
  });

  describe('%URL', () => {
    it('populates %URL', () => {
      const code = "const url = '%URL(SS_FA_FAFSA)';";
      expect(transform(code)).to.match(/https?:\/\/.*/);
    });
  });
});
