



export interface Category {
    id: number;
    is_in_serving: boolean;
    description: string;
    title: string;
    link: string;
    image_url: string;
    icon_url: string;
    title_color: string;
    __v: number;
}


export interface Support {
    description: string;
    icon_color: string;
    icon_name: string;
    id: number;
    name: string;
    _id: string;
}

export interface PiecewiseAgentFee {
    tips: string;
}

export interface License {
    catering_service_license_image: string;
    business_license_image: string;
}

export interface Identification {
    registered_number: string;
    registered_address: string;
    operation_period: string;
    licenses_scope: string;
    licenses_number: string;
    licenses_date: string;
    legal_person: string;
    identificate_date?: any;
    identificate_agency: string;
    company_name: string;
}

export interface DeliveryMode {
    color: string;
    id: number;
    is_solid: boolean;
    text: string;
}

export interface Shop {
    name: string;
    address: string;
    id: number;
    latitude: number;
    longitude: number;
    location: number[];
    phone: string;
    category: string;
    supports: Support[];
    status: number;
    recent_order_num: number;
    rating_count: number;
    rating: number;
    promotion_info: string;
    piecewise_agent_fee: PiecewiseAgentFee;
    opening_hours: string[];
    license: License;
    is_new: boolean;
    is_premium: boolean;
    image_path: string;
    identification: Identification;
    float_minimum_order_amount: number;
    float_delivery_fee: number;
    distance: string;
    order_lead_time: string;
    description: string;
    delivery_mode: DeliveryMode;
    activities: any[];
    __v: number;
}

export interface SearchHistory {
    id?: number;
    keyword: string;
}


export interface SearchItem {
    name: string;
    address: string;
    id: number;
    latitude: number;
    longitude: number;
    location: number[];
    phone: string;
    category: string;
    supports: Support[];
    status: number;
    recent_order_num: number;
    rating_count: number;
    rating: number;
    promotion_info: string;
    piecewise_agent_fee: PiecewiseAgentFee;
    opening_hours: string[];
    license: License;
    is_new: boolean;
    is_premium: boolean;
    image_path: string;
    identification: Identification;
    float_minimum_order_amount: number;
    float_delivery_fee: number;
    distance: string;
    order_lead_time: string;
    description: string;
    delivery_mode: DeliveryMode;
    activities: any[];
}




export interface Activity {
    image_text_color: string;
    icon_color: string;
    image_text: string;
}

export interface Spec {
    name: string;
    value: string;
    _id: string;
}

export interface Specfood {
    specs_name: string;
    name: string;
    item_id: number;
    sku_id: number;
    food_id: number;
    restaurant_id: number;
    _id: string;
    specs: Spec[];
    stock: number;
    checkout_mode: number;
    is_essential: boolean;
    recent_popularity: number;
    sold_out: boolean;
    price: number;
    promotion_stock: number;
    recent_rating: number;
    packing_fee: number;
    pinyin_name: string;
    original_price: number;
}

export interface Attribute {
    icon_color: string;
    icon_name: string;
}

export interface Specification {
    values: string[];
    name: string;
}

export interface Food {
    _id: string;
    tips: string;
    item_id: number;
    category_id: number;
    restaurant_id: number;
    activity: Activity;
    image_path: string;
    name: string;
    __v: number;
    specfoods: Specfood[];
    satisfy_rate: number;
    satisfy_count: number;
    attributes: Attribute[];
    is_essential: boolean;
    server_utc: string;
    specifications: Specification[];
    rating_count: number;
    month_sales: number;
    description: string;
    attrs: any[];
    display_times: any[];
    pinyin_name: string;
    is_featured: number;
    rating: number;
}

export interface ShopCategory {
    name: string;
    description: string;
    id: number;
    restaurant_id: number;
    foods: Food[];
    type: number;
    icon_url: string;
    is_selected: boolean;
    __v: number;
}



export interface ItemRating {
    food_id: number;
    food_name: string;
    _id: string;
    is_valid: number;
    image_hash: string;
}

export interface ShopRating {
    rated_at: string;
    rating_star: number;
    rating_text: string;
    time_spent_desc: string;
    _id: string;
    username: string;
    tags: any[];
    item_ratings: ItemRating[];
    highlights: any[];
    avatar: string;
}


export interface ShopScore {
    compare_rating: number;
    deliver_time: number;
    food_score: number;
    order_rating_amount: number;
    overall_score: number;
    service_score: number;
}



export interface ShopTag {
    name: string;
    _id: string;
    unsatisfied: boolean;
    count: number;
}

export interface Support {
    description: string;
    icon_color: string;
    icon_name: string;
    id: number;
    name: string;
    _id: string;
}

export interface PiecewiseAgentFee {
    tips: string;
}

export interface License {
    catering_service_license_image: string;
    business_license_image: string;
}

export interface Identification {
    registered_number: string;
    registered_address: string;
    operation_period: string;
    licenses_scope: string;
    licenses_number: string;
    licenses_date: string;
    legal_person: string;
    identificate_date?: any;
    identificate_agency: string;
    company_name: string;
}

export interface DeliveryMode {
    color: string;
    id: number;
    is_solid: boolean;
    text: string;
}

export interface ShopDetials {
    name: string;
    address: string;
    id: number;
    latitude: number;
    longitude: number;
    location: number[];
    phone: string;
    category: string;
    supports: Support[];
    status: number;
    recent_order_num: number;
    rating_count: number;
    rating: number;
    promotion_info: string;
    piecewise_agent_fee: PiecewiseAgentFee;
    opening_hours: string[];
    license: License;
    is_new: boolean;
    is_premium: boolean;
    image_path: string;
    identification: Identification;
    float_minimum_order_amount: number;
    float_delivery_fee: number;
    distance: string;
    order_lead_time: string;
    description: string;
    delivery_mode: DeliveryMode;
    activities: any[];
    __v: number;
}

export interface CartFood {
    category_id: number;
    item_id: number;
    food_id: number;
    num: number;
    price: number;
    name: string;
    specs: string;
}


export interface ShopCommData {
    totalPrice: number;
    cartFoodList: CartFood[];
    categoryNum: number[];
}


