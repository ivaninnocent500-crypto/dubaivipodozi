/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This allows images from any source (Common for Admin Dashboards)
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' }, // For Supabase Storage
      { protocol: 'https', hostname: 'res.cloudinary.com' }, // For Cloudinary
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
