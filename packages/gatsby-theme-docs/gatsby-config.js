const withDefault = require('./utils/default-options');

module.exports = (options) => {
  const data = withDefault(options);
  return {
    flags: {
      DEV_SSR: true,
      PRESERVE_WEBPACK_CACHE: true,
    },
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'gatsby-theme-docs',
          path: data.contentPath,
        },
      },
      !data.useExternalMDX && {
        resolve: 'gatsby-plugin-mdx',
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js'),
          },
        },
      },
      'gatsby-plugin-theme-ui',
    ].filter(Boolean),
  };
};
