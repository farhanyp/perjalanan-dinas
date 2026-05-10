import { LucideIcon } from 'lucide-react';

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface Island {
    id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
}

export interface Province {
    id: number;
    island_id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
    island?: Island;
}

export interface City {
    id: number;
    province_id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
    province?: Province;
}

export interface User {
    id: string;
    name: string;
    email?: string;
}

export interface Document {
    id: string;
    city_id: number;
    title: string;
    description: string | null;
    status: 'DRAFT' | 'PROCESSING' | 'APPROVE' | 'DECLINE' | 'ARCHIVED';
    start_date: string;
    end_date: string;
    message_decline: string | null;
    created_by: string;
    city?: City;
    creator?: User;
}

export interface ExchangeRateResponse {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: {
        [key: string]: number;
    };
}

export interface AllowanceCalculation {
    durationDays: number;
    dailyAllowance: number;
    totalAllowance: number;
    currency: 'IDR' | 'USD';
    totalAmountIdr: number;
    isAbroad: boolean;
    distanceKm?: number;
    exchangeRate?: number;
}

export interface StatusConfigItem {
    color: string;
    icon: LucideIcon;
}

export type StatusConfig = Record<Document['status'], StatusConfigItem>;
