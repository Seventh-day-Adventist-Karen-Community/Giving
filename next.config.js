/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  swcMinify: true
});

const nextConfig = withPWA({
  // Acknowledges Turbopack when Webpack plugins (like PWA) are present
  turbopack: {},

  // Temporary bypass for missing canonical route validation
  deprecated: {
    looseRouteMatching: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'tailwindui.com' },
      { protocol: 'https', hostname: 'www.kindpng.com' },
      { protocol: 'https', hostname: 'production-cms-assets.life.church' },
      { protocol: 'https', hostname: 'www.life.church' },
      { protocol: 'https', hostname: 'www.adventist.org' },
      { protocol: 'https', hostname: 'hilmus-tutor.s3.af-south-1.amazonaws.com' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: 'www.gcyouthministries.org' }
    ],
    dangerouslyAllowSVG: true
  }
});

module.exports = nextConfig;