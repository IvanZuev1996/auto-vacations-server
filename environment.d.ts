declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            MONGO_DB_URL: string;
        }
    }
}

export {};
