/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ibb.co", "upload.wikimedia.org", "link.fobshanghai.com"],
  },
};

module.exports = nextConfig;
