/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure videos are handled properly
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ]
  },
  // Handle large video files
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig