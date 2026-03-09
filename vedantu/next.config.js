/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
