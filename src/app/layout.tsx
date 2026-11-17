import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "photoswipe/dist/photoswipe.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../public/assets/icons/icomoon/style.css";
import "@/styles/template/app.scss";
import "@/styles/forms.css";
import "@/styles/responsive.css";
import "@/styles/map-controls.css";
import BackToTop from "@/components/ui/BackToTop";
import ClientScriptsLoader from "@/components/ui/ClientScriptsLoader";
import Script from "next/script";
import { resetLegacyWorker } from "@/lib/development-cache-reset";
import { Metadata } from "next";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kuala Kos",
    description: "Temukan pilihan kamar kos berdasarkan lokasi, fasilitas, dan harga bulanan di Banda Aceh dan Aceh Besar.",
    icons: { icon: "/icon.svg?v=2", apple: "/icon.svg?v=2" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <head>
                {process.env.NODE_ENV === "development" && (
                    <Script id="reset-legacy-development-worker" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: resetLegacyWorker }} />
                )}
            </head>
            <body className={manrope.variable}>
                <div id="wrapper">{children}</div>
                <ClientScriptsLoader />
                <BackToTop />
            </body>
        </html>
    );
}
