/* eslint-disable no-console */
const Request = require('request-promise');

require('dotenv').config({ silent: true });

const {
  HTTP_PASSWORD,
  HTTP_USERNAME,
  ISCRIPT_ENVIRONMENT,
  ISCRIPT_HOSTNAME,
  ISCRIPT_NODE
} = process.env;

const jar = Request.jar();
const request = Request.defaults({
  headers: {
    'User-Agent': 'request'
  },
  jar,
  resolveWithFullResponse: true
});

const uri =
  `https://${ISCRIPT_HOSTNAME}/psc/${ISCRIPT_ENVIRONMENT}/EMPLOYEE/` +
  `${ISCRIPT_NODE}/s/WEBLIB_H_DEV.ISCRIPT1.FieldFormula.IScript_Echo` +
  '?postDataBin=y';

const echo = () =>
  request
    .post({ url: uri, body: process.argv[2] })
    .auth(HTTP_USERNAME, HTTP_PASSWORD, false);

echo()
  .then(echo)
  .then(response => {
    if (parseInt(response.headers['x-status-code'], 10) >= 400) {
      throw new Error(response.body.exception);
    }
    console.log(response.body);
  })
  .catch(({ message }) => {
    console.error(message);
  });
