export interface Book {
   id: number,
   title: string,
   author: string,
   isbnCode: string,
   insertDate: String,
   deleteDate: String | null,
   plot: string,
   totalReadings: number,
   user_email: string
}