export interface Client {
    cod: number;
    name: string;
    cpf: string;
    gender: string;
    email: string;
}
export interface Product {
    cod: number;
    name: string;
    color: string;
    size: string;
    value: string;
}
export interface Order {
    cod: number;
    date: Date;
    obs: string;
    payment: string;
    cod_client: number;
}
export interface OrderProducts {
    cod: number;
    cod_product: number;
    quantity: number;
}
