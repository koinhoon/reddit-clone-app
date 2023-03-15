/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ['www.gravatar.com', 'localhost', 'ec2-54-249-99-38.ap-northeast-1.compute.amazonaws.com']
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:4000/api/:path*' // Proxy to Backend
  //     }
  //   ]
  // }
}

module.exports = nextConfig
