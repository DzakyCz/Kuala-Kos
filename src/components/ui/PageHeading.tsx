import Image from "next/image";
import Link from "next/link";
export default function PageHeading({title}: {title:string}) {
    return <div className="page-title style-default"><div className="thumbs"><Image src="/images/kos/page-title-page-title-15.jpg" width={1920} height={300} alt="" sizes="100vw" priority /></div><div className="content text-center"><div className="tf-container"><h2 className="title text_white mb_12">{title}</h2><ul className="breadcrumb justify-content-center text-button fw-4"><li><Link href="/">Beranda</Link></li><li>{title}</li></ul></div></div></div>;
}
