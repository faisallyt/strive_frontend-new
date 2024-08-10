/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://strive-backend-8ani.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
