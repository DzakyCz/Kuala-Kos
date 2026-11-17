"use client";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { galleryImages } from "@/data/kos-images";
import { useEffect, useState } from "react";
export default function PropertyGallery() {
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    return <><Gallery options={{closeTitle:"Tutup",zoomTitle:"Perbesar atau perkecil",arrowPrevTitle:"Foto sebelumnya",arrowNextTitle:"Foto berikutnya",errorMsg:"Foto tidak dapat dimuat"}}><div className="tf-grid-layout md-col-2 gap_20">{galleryImages.map(({src,width,height},index)=><Item key={src} original={src} thumbnail={src} width={width} height={height}>{({ref,open})=><button type="button" disabled={!ready} onClick={open} aria-label={`Buka foto ${index+1}`} style={{padding:0,border:0,background:"none",borderRadius:12,overflow:"hidden"}}><Image ref={ref} src={src} alt={`Foto interior kos ${index+1}`} width={635} height={635} sizes="(max-width: 767px) 92vw, 635px" style={{width:"100%",height:"auto",aspectRatio:"1",objectFit:"cover"}} /></button>}</Item>)}</div></Gallery></>;
}
