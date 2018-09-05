# v0.2.0
* Use [@highpoint/get-ps-token](https://www.npmjs.com/package/@highpoint/get-ps-token)
  to populate cookie jar.

Breaking changes:

* The following environment variables have changed names:
  * `ISCRIPT_HOSTNAME` => `PS_HOSTNAME`
  * `ISCRIPT_ENVIRONMENT` => `PS_ENVIRONMENT`
  * `ISCRIPT_NODE` => `PS_NODE`
  
* The following environments variables are now required:
  * `PS_USERNAME`
  * `PS_PASSWORD`

# v0.1.1
* Add missing repository URL to package.json

# v0.1.0
* Initial release
