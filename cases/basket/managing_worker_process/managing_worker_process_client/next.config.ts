import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/:path*`, 
  //     },
  //   ]
  // },
};

export default nextConfig;
