"use client";
import { useRef, useState } from "react";
import type { Property } from "@/types/property";
import PropertyLocation from "@/components/kos/details/PropertyLocation";
import RoomDimensions from "@/components/kos/details/RoomDimensions";
import PropertyGallery from "@/components/kos/details/PropertyGallery";
const tabs=[{id:"gallery",label:"Galeri Foto"},{id:"floor-plans",label:"Ukuran Kamar"},{id:"location",label:"Lokasi"}];
export default function PropertyTabs({property}: {property:Property}) {
    const [active,setActive]=useState("gallery");
    const root=useRef<HTMLDivElement>(null);
    return <div className="properties-menutab" ref={root}>
        <div className="tab-slide mb_28"><ul className="menu-tab d-flex align-items-center" role="tablist" aria-label="Detail kos">{tabs.map((tab,index)=><li key={tab.id} className={`nav-tab-item ${active===tab.id?"active":""}`} role="presentation"><button type="button" id={`tab-${tab.id}`} role="tab" aria-selected={active===tab.id} aria-controls={tab.id} tabIndex={active===tab.id?0:-1} className="h5 tab-link" style={{background:"transparent",border:0,borderBottom:active===tab.id?"2px solid #263c30":"2px solid transparent"}} onClick={()=>setActive(tab.id)} onKeyDown={event=>{if(event.key!=="ArrowRight"&&event.key!=="ArrowLeft")return;event.preventDefault();const next=tabs[(index+(event.key==="ArrowRight"?1:tabs.length-1))%tabs.length];setActive(next.id);root.current?.querySelector<HTMLButtonElement>(`#tab-${next.id}`)?.focus();}}>{tab.label}</button></li>)}</ul></div>
        <div className="tab-content"><div id={active} role="tabpanel" aria-labelledby={`tab-${active}`}>
            {active==="gallery"?<div className="properties-gallery"><PropertyGallery /></div>:active==="floor-plans"?<div className="properties-floor"><RoomDimensions property={property} /></div>:<div className="properties-location"><PropertyLocation property={property} /></div>}
        </div></div>
    </div>;
}
