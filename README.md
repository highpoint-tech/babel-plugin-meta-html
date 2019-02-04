# Meta-HTML Babel Plugin

Replaces PeopleSoft meta-HTML found in JavaScript with values from PeopleSoft.

This is useful when developing JavaScript locally.

For example:

```javascript
const message = '%Message(175, 5)';
```
will become
```javascript
const message = 'Custom Properties';
```

## Installation

`npm install @highpoint/babel-plugin-meta-html`

## Usage

Copy `.env-sample` to your root directory and name it `.env`. Then populate it
with values for your PeopleSoft environment. See "Environment Variables" below.

Add the plugin to your `.babelrc` file.

Simple example:

```json
{
  "env": {
    "development": {
      "plugins": [
        "@highpoint/meta-html"
      ]
    }
  }
}
```

Advanced example:

```json
{
  "env": {
    "development": {
      "plugins": [
          [
            "@highpoint/meta-html", {
              "cacheDirectory": "tmp",
              "cacheTTL": 600
            }
          ]
      ]
    }
  }
}
```

### Options

* `cacheDirectory`: Defaults to `node_modules/.cache/babel-plugin-meta-html`.
  Set to `false` to disable caching.
* `cacheTTL`: Cache's time-to-live value, in seconds. Values older than this
  will be refreshed. Defaults to 86,400 seconds (one day). 

## Environment Variables

| Variable        | Example        |
| --------------- | -------------- |
| PS_HOSTNAME     | ps.example.com |
| PS_ENVIRONMENT  | csdev          |
| PS_NODE         | SA             |
| PS_USERNAME     | username       |
| PS_PASSWORD     | password1      |
