"use client";
import {useState} from "react";
import Link from "next/link";
import KosSelect from "@/components/ui/KosSelect";
export default function RegisterForm() {
    const [role,setRole]=useState("Pencari Kos");
    return <div className="tf-container tf-spacing-1"><div className="row justify-content-center"><div className="col-lg-6"><form className="form-account" onSubmit={event=>event.preventDefault()}>
        <h3 className="text-center mb_24">Daftar di Kuala Kos</h3><p className="mb_24" role="status">Pendaftaran akun sedang disiapkan. Akun admin tidak tersedia melalui pendaftaran umum.</p>
        <div className="mb_20"><KosSelect id="register-role" label="Daftar Sebagai" value={role} onChange={setRole} options={["Pencari Kos","Pemilik Kos"]} /></div>
        <label htmlFor="register-name" className="form-label mb_8">Nama Lengkap</label><fieldset className="mb_20"><input type="text" id="register-name" autoComplete="name" placeholder="Masukkan nama lengkap" /></fieldset>
        <label htmlFor="register-email" className="form-label mb_8">Alamat Email</label><fieldset className="mb_20"><input id="register-email" type="email" autoComplete="email" placeholder="Masukkan alamat email" /></fieldset>
        <label htmlFor="register-password" className="form-label mb_8">Kata Sandi</label><fieldset className="mb_20"><input id="register-password" type="password" autoComplete="new-password" placeholder="Buat kata sandi" /></fieldset>
        <button type="submit" className="tf-btn btn-bg-1 w-full" disabled><span>Pendaftaran Segera Tersedia</span></button><p className="mt_20 text-center">Sudah punya akun? <Link href="/login" className="link">Lihat halaman masuk</Link></p>
    </form></div></div></div>;
}
