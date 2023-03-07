export  interface RatesResponse {
    success: boolean;
    timestamp: number;
    base: string;
    date: string;
    rates: {
        [key: string]: number
    };

    error?: {
        code: number;
        type: string
    }
}

export  interface ConvertResponse {
    success: boolean;
    query: {
        from: string;
        to: string;
        amount: number;
    }
    info: {
        timestamp: number;
        rate: number;
    }
    date: string;
    result: number;

    error?: {
        code: number;
        type: string
        info: string
    }
}