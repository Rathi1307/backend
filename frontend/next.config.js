/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  // Next.js 15: move from experimental.outputFileTracingRoot to top-level
  outputFileTracingRoot: __dirname,
}

module.exports = nextConfig
