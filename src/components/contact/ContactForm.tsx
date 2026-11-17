"use client";
import { useState, type FormEvent } from "react";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

// `property` diisi bila pengunjung datang dari halaman detail kos (/contacts?kos=ID).
export default function ContactForm({ property }: { property?: { id: number; title: string } }) {
    const [status, setStatus] = useState<Status>({ kind: "idle" });
    const sending = status.kind === "sending";

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        const text = (key: string) => String(data.get(key) ?? "").trim();
        setStatus({ kind: "sending" });
        try {
            const response = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: text("name"),
                    email: text("email"),
                    phone: text("phone") || undefined,
                    message: text("message"),
                    website: text("website") || undefined, // kolom jebakan bot, harus kosong
                    propertyId: property?.id,
                }),
            });
            const body = await response.json().catch(() => null);
            if (!response.ok) {
                setStatus({
                    kind: "error",
                    message: response.status === 422
                        ? "Periksa kembali isian formulir Anda (nama, email, nomor telepon, dan pesan minimal 10 karakter)."
                        : body?.error ?? "Pesan belum terkirim. Silakan coba lagi.",
                });
                return;
            }
            form.reset();
            setStatus({ kind: "success" });
        } catch {
            setStatus({ kind: "error", message: "Tidak dapat terhubung ke server. Periksa koneksi Anda lalu coba lagi." });
        }
    }

    return <div className="row tf-spacing-1 pb-0">
        <div className="col-md-6"><div className="box-contact"><h4 className="mb_20">Ada yang Ingin Ditanyakan?</h4><p className="mb_24">Kami membantu pendataan kos dan penyusunan informasi untuk pencari maupun pemilik kos.</p><ul className="info d-grid gap_20"><li><i className="icon-MapPin" /><div><h6 className="mb_8">Kawasan Layanan</h6><p>Banda Aceh dan Aceh Besar</p></div></li><li><i className="icon-HouseLine" /><div><h6 className="mb_8">Untuk Pemilik Kos</h6><p>Siapkan alamat, foto, tipe kamar, fasilitas, dan ketentuan biaya untuk pendataan.</p></div></li></ul></div></div>
        <div className="col-md-6">
            <form className="form-contact" onSubmit={onSubmit}>
                <h4 className="mb_16">Hubungi Kami</h4>
                <p className="mb_24">{property ? <>Pertanyaan tentang <strong>{property.title}</strong>. Pengelola akan menghubungi Anda melalui email.</> : "Tulis pertanyaan Anda, kami akan membalas melalui email."}</p>

                <label htmlFor="contact-name" className="mb_8">Nama Lengkap</label>
                <fieldset className="mb_20"><input type="text" id="contact-name" name="name" placeholder="Nama lengkap Anda" autoComplete="name" required minLength={2} maxLength={80} /></fieldset>

                <label htmlFor="contact-email" className="mb_8">Alamat Email</label>
                <fieldset className="mb_20"><input id="contact-email" name="email" type="email" placeholder="Alamat email Anda" autoComplete="email" required maxLength={254} /></fieldset>

                <label htmlFor="contact-phone" className="mb_8">Nomor Telepon / WhatsApp (opsional)</label>
                <fieldset className="mb_20"><input id="contact-phone" name="phone" type="tel" placeholder="Contoh: 0812 3456 7890" autoComplete="tel" pattern="[0-9+\- ]{8,20}" title="8 sampai 20 karakter: angka, +, -, atau spasi" /></fieldset>

                <label htmlFor="contact-message" className="mb_8">Pesan</label>
                <fieldset className="mb_20"><textarea id="contact-message" name="message" rows={4} placeholder="Tuliskan pertanyaan Anda" required minLength={10} maxLength={2000} /></fieldset>

                {/* Kolom jebakan bot: tersembunyi dari pengguna dan pembaca layar. */}
                <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                    <label htmlFor="contact-website">Situs web</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="mb_20" aria-live="polite">
                    {status.kind === "success" && <p role="status" style={{ color: "#2f6b3c" }}>Pesan terkirim. Terima kasih, kami akan segera menghubungi Anda.</p>}
                    {status.kind === "error" && <p role="alert" style={{ color: "#b3261e" }}>{status.message}</p>}
                </div>

                <button className="tf-btn btn-bg-1 w-full" type="submit" disabled={sending}><span>{sending ? "Mengirim..." : "Kirim Pesan"}</span></button>
            </form>
        </div>
    </div>;
}
