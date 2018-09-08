require("dotenv").config();

const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const Dotenv = require("dotenv-webpack");
const path = require("path");

// fix: prevents error when .css files are required by node
if (typeof require !== "undefined") {
  require.extensions[".css"] = () => {};
}

module.exports = withTypescript(
  withCSS({
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];

      return config;
    }
  })
);
