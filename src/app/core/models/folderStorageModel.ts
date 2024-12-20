export interface Folder {
  id: number;
  name: string;
  userId: number;
  parentId?: number; // Este campo es opcional para indicar si la carpeta es anidada
  path: string;
}