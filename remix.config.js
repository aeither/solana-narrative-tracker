/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/*.css"],
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      http: true,
      https: true,
      zlib: true,
      util: true,
      url: true,
      stream: true,
      assert: true,
      string_decoder: true,
      events: true,
    },
    globals: {
      Buffer: true,
    },
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
