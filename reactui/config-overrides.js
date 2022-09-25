const {
  override,
  addBabelPlugin,
  overrideDevServer,
} = require("customize-cra");

const path = require('path');
// const dotenv = require("dotenv");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const checkEnv = name => {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production";

if (isProduction) process.env.GENERATE_SOURCEMAP = false;

// === CDN ===

const unpkgOptions = {
  name: null,
  dist: "umd",
  dev: "development",
  prod: "production.min",
  ext: ".js",
  join: ".",
  ret: (dist, name, join, suffix, ext) => {
    if (suffix === null) suffix = join = '';
    dist = dist === null ? "" : dist + "/";
    return `${dist}${name}${join}${suffix}${ext}`;
  },
};

const unpkg = (options = {}) => {
  const namespace = { ...unpkgOptions, ...options };
  let { name, dist, dev, prod, ext, join, ret } = namespace;
  const suffix = isProduction ? prod : dev;
  return ret(dist, name, join, suffix, ext);
};

const cdn = (name, var_, options = {}) => ({
  name, var: var_, path: unpkg({ name, ...options }),
});

const cdnCFG = {
  'react': ['React'],
  'react-dom': ['ReactDOM'],
  // 'history': ['HistoryLibrary'],
  // 'react-router': ['ReactRouter'],
  // 'react-router-dom': ['ReactRouterDOM'],
  // 'redux': ['Redux', { dist: "dist", dev: null, prod: "min" }],
  '@emotion/react': ['emotionReact', { dist: "dist", dev: null, prod: null, name: "emotion-react.umd.min" }],
  '@mui/material': ['MaterialUI', { name: "material-ui" }],
};

const webpackCdnPluginModules = [];

for (const [key, data] of Object.entries(cdnCFG)) {
  webpackCdnPluginModules.push(cdn(key, ...data));
};

const webpackCdnPlugin = new WebpackCdnPlugin({
  modules: webpackCdnPluginModules,
  // prod: isProduction,
  // publicPath: '/node_modules',
});

// === Babel ===

const babelPlugins = [
  "babel-plugin-root-import",
];

const babelPluginHandlers = babelPlugins.map(addBabelPlugin);

// === handlers ===

const devServerConfig = (config) => {
  if (!config.proxy) config.proxy = {};
  config.proxy["/api"] = { target: checkEnv("REACT_APP_API_URL") };
  return config;
};

const findByConstructorName = (entries, consteructorName) => {
  for (let entry of entries) {
    if (entry.constructor.name === consteructorName) {
      return entry;
    }
  }
};

const handleWebpackOptimizationTerserPlugin = (terserPlugin) => {
  if (!isProduction) return;

  terserPlugin.options.extractComments = false;

  if (!terserPlugin.options.format) terserPlugin.options.format = {};

  terserPlugin.options.format.comments = false;
  terserPlugin.options.minimizer.options.compress.drop_console = true;
};

const handleWebpackPlugins = (plugins) => {
  plugins.push(webpackCdnPlugin);
};

const handleWebpackOptimization = (optimization) => {
  const { minimizer } = optimization;
  const terserPlugin = findByConstructorName(minimizer, "TerserPlugin");
  terserPlugin && handleWebpackOptimizationTerserPlugin(terserPlugin);
};

const handleWebpackResolve = (resolve) => { };

const webpackConfig = (config) => {
  babelPluginHandlers.forEach(i => i(config));

  const { plugins, optimization, resolve } = config;

  handleWebpackPlugins(plugins);
  handleWebpackOptimization(optimization);
  handleWebpackResolve(resolve);

  return config;
};

module.exports = {
  webpack: override(webpackConfig),
  devServer: overrideDevServer(devServerConfig),
};
