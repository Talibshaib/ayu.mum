/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        // Disable the experimental CSS features in Turbopack
        '*.css': ['style-loader', 'css-loader', 'postcss-loader']
      }
    }
  }
}

module.exports = nextConfig 