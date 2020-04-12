export type IataCode = { id: number, code: string, location: string }

export interface Pickup {
    location: string;
    datetime: string;
}

export interface Dropoff {
    location: string;
    datetime: string;
}

export interface Details {
    pickup: Pickup;
    dropoff: Dropoff;
}

export interface Scrape {
    details: Details;
    vehicle: any[];
}

export interface SearchResponse {
    scrape: Scrape;
}