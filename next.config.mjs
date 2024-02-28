/** @type {import('next').NextConfig} */

// import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // sentry: {

  // }
};


// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

//   org: "cherish-t2",
//   project: "db-test-mysql",

//   // An auth token is required for uploading source maps.
//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   silent: true, // Suppresses all logs

//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

// export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
export default nextConfig;
