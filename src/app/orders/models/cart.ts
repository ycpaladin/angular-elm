
export interface CartItem {
    id?: number;
    shopId: number;
    item_id: number;
    food_id: number;
    category_id: number;
    packing_fee: number;
    sku_id: number;
    stock: number;
    name: string;
    price: number;
    specs: string;
}
