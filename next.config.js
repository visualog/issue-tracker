/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/issue-tracker' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/issue-tracker/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 