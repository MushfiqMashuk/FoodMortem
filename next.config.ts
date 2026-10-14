import type { NextConfig } from "next";
import { IMAGE_HOSTS } from "./src/lib/images";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: IMAGE_HOSTS.map((hostname) => ({ protocol: "https", hostname })),
  },
};

export default nextConfig;
