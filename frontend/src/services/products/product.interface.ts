export interface IProduct {
    id: string;
    name: string;
    price: number;
    photo: string;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
}