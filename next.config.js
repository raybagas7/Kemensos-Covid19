/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.BASE_JSON_URL,
  },
  images: {
    domains: ["dummyimage.com"],
  },
};

module.exports = nextConfig;
