export interface GBookResponse{
   items: GoogleBook[],
   kind: string,
   totalItems: number
}

export interface GoogleBook {
   volumeInfo: {
      title: string,
      authors: string[],
      description: string,
      industryIdentifiers: {
         type: string,
         identifier: string
      }[]
   }
}