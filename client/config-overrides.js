const webpack = require("webpack");

module.exports = function override(config) {
  // Ensure fallback for process/browser is correctly set
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
    util: require.resolve("util"),
    url: require.resolve("url"),
    'process/browser': require.resolve('process/browser') // Fix for process/browser
  });
  config.resolve.fallback = fallback;

  // Add support for top-level await if needed
  const experiments = config.experiments || {};
  Object.assign(experiments, {
    topLevelAwait: true,
  });
  config.experiments = experiments;

  // Ignore source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  // Ensure process and Buffer are available globally
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser", // Providing process globally
      Buffer: ["buffer", "Buffer"], // Providing Buffer globally
    }),
  ]);

  return config;
};
