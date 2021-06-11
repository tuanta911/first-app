export interface IProduct {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  Category?: string;
  tags?: string[];
}

export interface ProductResolved {
  product?: IProduct;
  error?: any;
}
