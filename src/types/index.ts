export type IataCode = { id: number, code: string, location: string }

export type CarsFilterProps = {
    onChange: (d: CarsSearchCriteria) => void,
    style?: React.CSSProperties,
};

export type CarsSearchCriteria = { term: 'cars', location: IataCode, puDate: string | null, doDate: string | null }

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