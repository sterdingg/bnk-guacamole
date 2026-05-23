/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    memoryBasedWorkersCount: true,
    cpus: 1, // Limit to 1 CPU core to save RAM on GitHub Actions Free Tier
  }
}

module.exports = nextConfig
