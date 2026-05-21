/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_CURRENT_VERSION: process.env.CURRENT_VERSION || '',
  },
};

module.exports = nextConfig;
