const request = require('request-promise');
const getToken = require('@highpoint/get-ps-token');

require('dotenv').config({ silent: true });

const {
  PS_ENVIRONMENT,
  PS_HOSTNAME,
  PS_NODE,
  HTTP_PASSWORD,
  HTTP_USERNAME
} = process.env;

(async () => {
  const uri =
    `https://${PS_HOSTNAME}/psc/${PS_ENVIRONMENT}/EMPLOYEE/${PS_NODE}/s/` +
    'WEBLIB_H_DEV.ISCRIPT1.FieldFormula.IScript_Echo?postDataBin=y';
  const response = await request
    .post({
      uri,
      headers: {
        'User-Agent': 'request'
      },
      jar: await getToken(process.env),
      resolveWithFullResponse: true,
      body: process.argv[2]
    })
    .auth(HTTP_USERNAME, HTTP_PASSWORD, false);
  if (parseInt(response.headers['x-status-code'], 10) >= 400) {
    throw new Error(response.body.exception);
  }
  console.log(response.body);
})().catch(({ message }) => {
  console.error(message);
});
