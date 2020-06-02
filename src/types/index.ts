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

export interface Visitor {
    ip: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_code: string;
    country_code_iso3: string;
    country_capital: string;
    country_tld: string;
    country_name: string;
    continent_code: string;
    in_eu: boolean;
    postal?: any;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
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