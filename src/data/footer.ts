export type FooterLink = { href: string; label: string };
export type FooterSection = { className: string; heading: string; links: FooterLink[] };
export const footerSections: FooterSection[] = [
    { className: "company", heading: "Jelajahi", links: [
        { href: "/", label: "Beranda" },
        { href: "/listing-topmap-grid", label: "Cari Kos" },
        { href: "/about-us", label: "Tentang Kami" },
    ] },
    { className: "quick-link", heading: "Informasi", links: [
        { href: "/contacts", label: "Kontak" },
        { href: "/FAQs", label: "Pertanyaan Umum" },
        { href: "/privacy-policy", label: "Kebijakan Privasi" },
        { href: "/login", label: "Masuk / Daftar" },
    ] },
];
