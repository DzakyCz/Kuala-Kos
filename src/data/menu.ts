type MenuItem = { title: string; href: string; links: Array<{ href?: string; label: string; sub?: Array<{ href: string; label: string }> }> };

export const menuItems: MenuItem[] = [
    { title: "Beranda", href: "/", links: [] },
    { title: "Cari Kos", href: "/listing-topmap-grid", links: [] },
    { title: "Tentang Kami", href: "/about-us", links: [] },
    { title: "Kontak", href: "/contacts", links: [] },
];
