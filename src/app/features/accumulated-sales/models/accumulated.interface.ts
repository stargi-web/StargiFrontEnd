export interface Accumulated {
  id?: number;
  previousAccumulated: number;
  currentAccumulated: number;
  goal: number;
  createdAt?: Date;
  updatedAt?: Date;
}
