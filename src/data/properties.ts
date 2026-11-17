import type { Property } from "@/types/property";


// Data demo: nama, tarif, dan koordinat bukan listing kos terverifikasi.
// Field sqft dipertahankan untuk kompatibilitas rancangan awal; nilainya kini dalam m2.
export const properties: Property[] = [
    {
        "id": 1,
        "imgSrc": "/images/kos/home-home-1.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Darussalam",
        "address": "Kopelma Darussalam, Banda Aceh, Aceh",
        "title": "Kos Putri Darussalam",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.568,
        "long": 95.365,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "price": 650000,
        "periodPrices": { "sixMonths": 3600000, "yearly": 7000000 },
        "coordinates": [
            95.365,
            5.568
        ],
        "garages": 1,
        "city": "Kopelma Darussalam",
        "description": "Pilihan kamar kos di kawasan Kopelma Darussalam. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Luar/Bersama",
        "electricityIncluded": true,
        "availableRooms": 2,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": [
            "Jam Malam"
        ]
    },
    {
        "id": 2,
        "imgSrc": "/images/kos/home-home-2.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Rukoh",
        "address": "Rukoh, Banda Aceh, Aceh",
        "title": "Kos Putra Rukoh",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 9,
        "lat": 5.574,
        "long": 95.3594,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "price": 550000,
        "periodPrices": { "sixMonths": 3000000, "yearly": 5800000 },
        "coordinates": [
            95.3594,
            5.574
        ],
        "garages": 1,
        "city": "Rukoh",
        "description": "Pilihan kamar kos di kawasan Rukoh. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Luar/Bersama",
        "electricityIncluded": false,
        "availableRooms": 3,
        "roomWidth": 3,
        "roomLength": 3,
        "roomFacilities": [
            "Wi-Fi"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 3,
        "imgSrc": "/images/kos/home-home-3.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Lingkar Kampus",
        "address": "Tungkop, Aceh Besar, Aceh",
        "title": "Kos Putri Lingkar Kampus",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.5745,
        "long": 95.377,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "Pagar"
        ],
        "price": 750000,
        "coordinates": [
            95.377,
            5.5745
        ],
        "garages": 1,
        "city": "Tungkop",
        "description": "Pilihan kamar kos di kawasan Tungkop. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": true,
        "availableRooms": 1,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari",
            "Meja",
            "Kursi",
            "Jendela",
            "Kloset Duduk"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar",
            "Wi-Fi",
            "Musala",
            "Penjaga Kos"
        ],
        "rules": []
    },
    {
        "id": 4,
        "imgSrc": "/images/kos/home-home-4.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Lamnyong",
        "address": "Lamnyong, Banda Aceh, Aceh",
        "title": "Kos Putra Lamnyong",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 9,
        "lat": 5.5718,
        "long": 95.3545,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "price": 500000,
        "coordinates": [
            95.3545,
            5.5718
        ],
        "garages": 1,
        "city": "Lamnyong",
        "description": "Pilihan kamar kos di kawasan Lamnyong. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Luar/Bersama",
        "electricityIncluded": false,
        "availableRooms": 0,
        "roomWidth": 3,
        "roomLength": 3,
        "roomFacilities": [
            "Wi-Fi"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 5,
        "imgSrc": "/images/kos/home-home-5.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Tanjung Selamat",
        "address": "Tanjung Selamat, Aceh Besar, Aceh",
        "title": "Kos Putri Tanjung Selamat",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.5605,
        "long": 95.372,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "Pagar"
        ],
        "price": 850000,
        "coordinates": [
            95.372,
            5.5605
        ],
        "garages": 1,
        "city": "Tanjung Selamat",
        "description": "Pilihan kamar kos di kawasan Tanjung Selamat. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": true,
        "availableRooms": 3,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 6,
        "imgSrc": "/images/kos/home-home-6.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Limpok",
        "address": "Limpok, Aceh Besar, Aceh",
        "title": "Kos Putra Limpok",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 9,
        "lat": 5.5518,
        "long": 95.3678,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "price": 600000,
        "coordinates": [
            95.3678,
            5.5518
        ],
        "garages": 1,
        "city": "Limpok",
        "description": "Pilihan kamar kos di kawasan Limpok. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Luar/Bersama",
        "electricityIncluded": false,
        "availableRooms": 1,
        "roomWidth": 3,
        "roomLength": 3,
        "roomFacilities": [
            "Wi-Fi"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 7,
        "imgSrc": "/images/kos/home-home-7.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Rukoh Asri",
        "address": "Rukoh, Banda Aceh, Aceh",
        "title": "Kos Putri Rukoh Asri",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.576,
        "long": 95.3604,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "AC",
            "CCTV"
        ],
        "price": 950000,
        "coordinates": [
            95.3604,
            5.576
        ],
        "garages": 1,
        "city": "Rukoh",
        "description": "Pilihan kamar kos di kawasan Rukoh. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": true,
        "availableRooms": 2,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari",
            "AC"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "CCTV",
            "Mesin Cuci",
            "Laundry",
            "Kulkas"
        ],
        "rules": []
    },
    {
        "id": 8,
        "imgSrc": "/images/kos/home-home-8.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Darussalam Nyaman",
        "address": "Kopelma Darussalam, Banda Aceh, Aceh",
        "title": "Kos Putra Darussalam Nyaman",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.567,
        "long": 95.364,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "AC",
            "Parkir Mobil",
            "Akses 24 Jam",
            "CCTV"
        ],
        "price": 1100000,
        "coordinates": [
            95.364,
            5.567
        ],
        "garages": 1,
        "city": "Kopelma Darussalam",
        "description": "Pilihan kamar kos di kawasan Kopelma Darussalam. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": false,
        "availableRooms": 3,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari",
            "AC"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Parkir Mobil",
            "CCTV"
        ],
        "rules": [
            "Akses 24 Jam"
        ]
    },
    {
        "id": 9,
        "imgSrc": "/images/kos/home-home-9.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Tungkop Sejahtera",
        "address": "Tungkop, Aceh Besar, Aceh",
        "title": "Kos Putri Tungkop Sejahtera",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.573,
        "long": 95.379,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "Pagar"
        ],
        "price": 700000,
        "coordinates": [
            95.379,
            5.573
        ],
        "garages": 1,
        "city": "Tungkop",
        "description": "Pilihan kamar kos di kawasan Tungkop. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": false,
        "availableRooms": 0,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 10,
        "imgSrc": "/images/kos/home-home-10.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Lamnyong Mandiri",
        "address": "Lamnyong, Banda Aceh, Aceh",
        "title": "Kos Putra Lamnyong Mandiri",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 9,
        "lat": 5.573,
        "long": 95.3558,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "price": 450000,
        "coordinates": [
            95.3558,
            5.573
        ],
        "garages": 1,
        "city": "Lamnyong",
        "description": "Pilihan kamar kos di kawasan Lamnyong. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Luar/Bersama",
        "electricityIncluded": false,
        "availableRooms": 2,
        "roomWidth": 3,
        "roomLength": 3,
        "roomFacilities": [
            "Wi-Fi"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Pagar"
        ],
        "rules": []
    },
    {
        "id": 11,
        "imgSrc": "/images/kos/home-home-1.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putri Limpok Harmoni",
        "address": "Limpok, Aceh Besar, Aceh",
        "title": "Kos Putri Limpok Harmoni",
        "categories": "Kos Putri",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.553,
        "long": 95.369,
        "filterOptions": [
            "Kos Putri"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "AC",
            "CCTV"
        ],
        "price": 1250000,
        "coordinates": [
            95.369,
            5.553
        ],
        "garages": 1,
        "city": "Limpok",
        "description": "Pilihan kamar kos di kawasan Limpok. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": true,
        "availableRooms": 3,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari",
            "AC"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "CCTV"
        ],
        "rules": []
    },
    {
        "id": 12,
        "imgSrc": "/images/kos/home-home-2.jpg",
        "imgSrc2": "/images/kos/section-properties-gallery-1.jpg",
        "alt": "Ilustrasi Kos Putra Tanjung Selamat",
        "address": "Tanjung Selamat, Aceh Besar, Aceh",
        "title": "Kos Putra Tanjung Selamat",
        "categories": "Kos Putra",
        "type": "Rent",
        "beds": 1,
        "baths": 1,
        "sqft": 12,
        "lat": 5.562,
        "long": 95.374,
        "filterOptions": [
            "Kos Putra"
        ],
        "features": [
            "Wi-Fi",
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Kamar Mandi Dalam",
            "Tempat Tidur",
            "Lemari",
            "AC",
            "Parkir Mobil",
            "Akses 24 Jam",
            "CCTV"
        ],
        "price": 1500000,
        "coordinates": [
            95.374,
            5.562
        ],
        "garages": 1,
        "city": "Tanjung Selamat",
        "description": "Pilihan kamar kos di kawasan Tanjung Selamat. Bandingkan fasilitas, biaya bulanan, dan ketentuan sebelum menghubungi pengelola.",
        "bathroomType": "Dalam",
        "electricityIncluded": false,
        "availableRooms": 1,
        "roomWidth": 3,
        "roomLength": 4,
        "roomFacilities": [
            "Wi-Fi",
            "Tempat Tidur",
            "Lemari",
            "AC"
        ],
        "sharedFacilities": [
            "Parkir Motor",
            "Dapur Bersama",
            "Air Bersih",
            "Parkir Mobil",
            "CCTV"
        ],
        "rules": [
            "Akses 24 Jam"
        ]
    }
];

export const populor = properties.slice(0, 5);
export const topProperties = properties.slice(0, 6);
export const recommendedProperties = properties.slice(6, 9);
export const propertieslist = properties.slice(0, 3);
export const allProperties = properties;
