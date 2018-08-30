const babel = require('@babel/core');
const { expect } = require('chai');

require('dotenv').config({ silent: true });

const pluginPath = require.resolve('../src');

const { ISCRIPT_ENVIRONMENT } = process.env;

const transform = code =>
  babel.transformSync(code, {
    plugins: [[pluginPath]]
  }).code;

describe('index', function test() {
  this.timeout(5000);

  it('ignores string', () => {
    let code;

    code = "const string = 'string';";
    expect(transform(code)).to.equal(code);

    code = "const string = 'a %URL';";
    expect(transform(code)).to.equal(code);
  });

  describe('%ContentReference', () => {
    it('populates %ContentReference', () => {
      const code =
        "const url = '%ContentReference(EMPLOYEE, PT_PTFP_VIEW_GBL, psp)';";
      expect(transform(code)).to.match(/https?:\/\//);
    });
  });

  describe('%DBName', () => {
    it('populates %DBName', () => {
      const code = "const database = '%DBName';";
      expect(transform(code)).to.include(ISCRIPT_ENVIRONMENT.toUpperCase());
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
