import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            ...["/home02","/home03","/home04","/home05","/blog-standard","/blog-grid","/blog-list"].map(source=>({source,destination:"/",permanent:false})),
            ...["/listing-topmap-list","/listing-left-sidebar","/listing-right-sidebar","/listing-half-map-grid","/listing-half-map-list"].map(source=>({source,destination:"/listing-topmap-grid",permanent:false})),
            ...[1,3,4].map(variant=>({source:`/property-details-${variant}/:id`,destination:"/property-details-2/:id",permanent:false})),
            {source:"/blog-post-1/:id",destination:"/",permanent:false},
            {source:"/blog-post-2/:id",destination:"/",permanent:false},
            {source:"/our-pricing",destination:"/contacts",permanent:false},
        ];
    },
};

export default function createNextConfig(phase: string): NextConfig {
    return {
        ...nextConfig,
        // Production builds must not replace modules served by the dev server.
        distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    };
}
