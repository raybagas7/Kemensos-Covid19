/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.BASE_JSON_URL,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;
