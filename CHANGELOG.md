# v3.0.0
* Remove support for `%ContentReference`. The functionality works without issue,
but we want to discourage its use.

# v2.0.0
* Remove trailing newline character from output. This is good house-keeping, but
also fixes issues where a regular expression is in use and does not expect a
newline character at the end of the string.

BREAKING CHANGE
* Fix `opts` declaration so it does not have to be nested inside an object for
its options to be used. This was a bug, but since it changes the API, it's also
a breaking change.

# v1.0.0
* Plugin is stable, so release v1.
* Change default cache time from 30 minutes to one day.

# v0.2.2
* Upgrade to latest `@highpoint/get-ps-token`.

# v0.2.1
* Add caching functionality

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
