import moment from "moment";

export type GRCGDSCode = {
    id?: number,
    internalcode: string,
    locationname?: string,
    locationvariation?: string,
    country?: string
}

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
    doors: string | number;
    seats: string | number;
    luggages?: string | number;
    name: string;
    transmission: string;
    acriss: string;
    price: number;
    secondary_price: number;
    currency?: string,
    custom_location: string
    image_preview_url?: string
    suppliername?: string
    carrentalcompanyname?: string
    supplier_logo?: string
    airConditioner: string
    clickThroughUrl: string
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