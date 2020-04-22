import moment from "moment";

export type IataCode = { id: number, code: string, location: string }

export interface DynamicFilter {
    id: number;
    offering: string;
    responseProperty: string;
    name: string;
    type: string;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
    values: any[];
}


export interface Vehicle {
    doors: string;
    seats: number;
    name: string;
    transmission: string;
    acriss: string;
    price: number;
    secondary_price: number;
    currency?: string,
    custom_location: string
    image_preview_url?: string
    baseUrl?: string
    client_name?: string
    client_logo?: string
    airConditioner: string
    [k: string]: any | undefined
}

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
    vehicle: { vehicle: Vehicle}[];
}

export interface SearchResponse {
    scrape: Scrape;
}

export enum Terms {
    Cars='Cars',
    Hotels='Hotels',
    Flights='Flights',
    Cruises='Cruises',
}