export interface IHotel {
    id: string;
    title: string;
    location: string;
    score: number;
    price: number;
    thumbnail: string;
    images: string[];
    star: number;
    description: {
        overview: {
            description: string;
        };
        amenities: string[];
        rules: {
            checkIn: string;
            checkOut: string;
            information: string[];
        };
    };
    maps: [number, number];
    image360: string;
    video: string;
}