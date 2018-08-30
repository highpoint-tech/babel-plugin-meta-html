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

Add the following to your `.babelrc` file:

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

Copy `.env-sample` to your root directory and name it `.env`. Then populate it
with values for your PeopleSoft environment.
