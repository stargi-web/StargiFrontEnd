export interface File {
    id: number;
    fileName: string;
    userId: number;
    folderId: number; // Este campo es opcional para indicar si la carpeta es anidada
    filePath: string;
    fileSize?: number;
    contentType?: string;
}