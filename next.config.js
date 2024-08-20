const createNextIntlPlugin = require('next-intl/plugin');
const { withContentlayer } = require('next-contentlayer2');
const withNextIntl = createNextIntlPlugin();

module.exports = () => {
  const plugins = [withContentlayer, withNextIntl];
  return plugins.reduce((acc, next) => next(acc), {

    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });

      return config;
    }
  });
};
