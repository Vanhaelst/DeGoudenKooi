/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "degoudenkooi.pluxit.be",
            },
            {
                protocol: "https",
                hostname: "degoudenkooi.pluxit.be",
            },
        ],
    },
};

export default nextConfig;
