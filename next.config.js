/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["react-helpers"],
  images: {
    remotePatterns: [
      {
        hostname: "flowbite.com",
      },
    ],
  },
};
export default nextConfig;
