export interface Book {
   id: number,
   title: string,
   author: string;
   isbnCode: string;
   insertDate: Date;
   deleteDate?: Date;
   plot: string;
   totalReadings: number;
   userEmail: string;
}