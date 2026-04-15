const nextConfig: import('next').NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/ai-resume-screener',
  trailingSlash: true,
};

export default nextConfig;
