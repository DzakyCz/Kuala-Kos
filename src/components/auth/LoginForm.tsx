"use client";
import {useState} from "react";
import Link from "next/link";
export default function LoginForm() {
    const [show,setShow]=useState(false);
    return <div className="tf-container tf-spacing-1"><div className="row justify-content-center"><div className="col-lg-6">
        <form className="form-account" onSubmit={event=>event.preventDefault()}><h3 className="text-center mb_24">Masuk ke Kuala Kos</h3><p className="mb_24" role="status">Layanan akun sedang disiapkan. Anda tetap dapat mencari kos tanpa masuk.</p>
            <label htmlFor="login-email" className="form-label mb_8">Alamat Email</label><fieldset className="mb_20"><input id="login-email" type="email" autoComplete="email" placeholder="Masukkan alamat email" /></fieldset>
            <label htmlFor="login-password" className="form-label mb_8">Kata Sandi</label><fieldset className="mb_20"><input id="login-password" type={show?"text":"password"} autoComplete="current-password" placeholder="Masukkan kata sandi" /></fieldset>
            <label className="d-flex gap_8 mb_20"><input type="checkbox" checked={show} onChange={event=>setShow(event.target.checked)} style={{width:18,height:18,appearance:"auto"}} />Tampilkan kata sandi</label>
            <button type="submit" className="tf-btn btn-bg-1 w-full" disabled><span>Masuk Segera Tersedia</span></button><p className="mt_20 text-center">Belum punya akun? <Link href="/register" className="link">Lihat halaman daftar</Link></p>
        </form>
    </div></div></div>;
}
