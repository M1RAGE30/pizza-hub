import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['media.dodostatic.net', 'cdn.inappstory.ru'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        dns: false,
        stream: false,
        path: false,
        os: false,
        child_process: false,
        module: false,
        worker_threads: false,
      };
    }
    
    config.module.rules.push({
      test: /\.html$/,
      type: 'asset/resource',
    });
    
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push('bcrypt', 'nodemailer', '@react-email/render');
    }
    
    config.ignoreWarnings = [
      /Failed to parse source map/,
      /Critical dependency: the request of a dependency is an expression/,
      /Module parse failed.*Unexpected token/,
      /Can't resolve 'child_process'/,
      /Can't resolve 'net'/,
      /Can't resolve 'tls'/,
      /Can't resolve 'dns'/,
    ];
    
    return config;
  },
};

export default nextConfig;