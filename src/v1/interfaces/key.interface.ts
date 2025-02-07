export interface KeyInterface {
    type: any;
    native: boolean;
    key: string;
    optional?: boolean;
    population?: 'array' | 'object' | 'single';
};
