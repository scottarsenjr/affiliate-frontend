export interface ICarrier {
    carrier_id: number;
    carrier_name: string;
    country_name: string;
    ecpc_recent: string;
    updated_at: Date;
    on_record: number;
}

export interface ILimitOffsetPagination {
    limit?: number;
    offset?: number;
}

export enum ECarrierFields {
    carrier_id = 'carrier_id',
    carrier_name = 'carrier_name',
    country_name = 'country_name',
    ecpc_recent = 'ecpc_recent',
    updated_at = 'updated_at',
    on_record = 'on_record'
}

export interface ICarriersQueryParams extends ILimitOffsetPagination {
    min_ecpc?: string;
    carrier_name?: string;
    country_name?: string;
    order_by?: ECarrierFields;
    order_type?: 'asc' | 'desc'
}
