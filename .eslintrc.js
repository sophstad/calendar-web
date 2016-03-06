module.exports = {
  "extends": ["standard", "standard-react"],
  "globals": {
    "__DEV__": false,
    "process.env.NODE_ENV": false
  },
  "rules": {
    "jsx-quotes": [2, "prefer-double"],
    "object-curly-spacing": [2, "always"],
    "operator-linebreak": [2, "before", {
      "overrides": {
        "?": "after"
      }
    }],
    "space-before-function-paren": 0,
    "react/jsx-curly-spacing": [2, "always"],
    "react/prop-types": 0
  }
};
