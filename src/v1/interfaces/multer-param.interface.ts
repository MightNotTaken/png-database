export interface MulterParams {
    file: (file: Express.Multer.File) => string;
    folder: (file: Express.Multer.File) => string;
    filter: (file: Express.Multer.File) => { allow: boolean; error?: Error | null };
}