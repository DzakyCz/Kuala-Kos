"use client";

import dynamic from "next/dynamic";

// Animation plugins only need the DOM; keep them out of server prerendering.
const ClientScripts = dynamic(() => import("./ClientScripts"), {
    ssr: false,
});

export default function ClientScriptsLoader() {
    return <ClientScripts />;
}
