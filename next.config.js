/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/aiagents',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig 