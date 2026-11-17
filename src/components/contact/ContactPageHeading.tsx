import Image from "next/image";
import Link from "next/link";

export default function ContactPageHeading() {
    return (
        <div className="page-title style-default">
            <div className="thumbs">
                <Image
                    src="/images/kos/page-title-page-title-15.jpg"
                    width={1920}
                    height={300}
                    alt=""
                    priority
                />
            </div>
            <div className="content text-center">
                <div className="tf-container">
                    <h2 className="title text_white mb_12">Kontak</h2>
                    <ul className="breadcrumb justify-content-center text-button fw-4">
                        <li>
                            <Link href="/">Beranda</Link>
                        </li>
                        <li>Kontak</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
