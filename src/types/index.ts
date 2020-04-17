export type IataCode = { id: number, code: string, location: string }

export type CarsFilterProps = {
    onChange: (d: CarsSearchCriteria) => void,
    style?: React.CSSProperties,
};

export type CarsSearchCriteria = { term: 'cars', location: IataCode, puDate: string | null, doDate: string | null }

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

export enum Terms {
    Cars='Cars',
    Hotels='Hotels',
    Flights='Flights',
    Cruises='Cruises',
}