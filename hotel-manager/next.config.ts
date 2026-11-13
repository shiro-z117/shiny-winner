import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // these two caused a problem in a previous project i forgot what but you might need to disable them again idk. leaving them here for now anyways
  cacheComponents: true,
  partialPrefetching: true,
  // TODO uncomment at some point
  // devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
