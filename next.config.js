/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dor.wa.gov'],
  },
  env: {
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    CUSTOMGPT_API_KEY: process.env.CUSTOMGPT_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}

module.exports = nextConfig
