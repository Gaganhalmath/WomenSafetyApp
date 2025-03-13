// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Append 'ppn' so that your model file is recognized as an asset.
  config.resolver.assetExts.push('ppn');
  return config;
})();
