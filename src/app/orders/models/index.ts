

export interface Position {
  address: string;
  city: string;
  geohash: string;
  latitude: string;
  longitude: string;
  name: string;
}

export interface PositionWithId extends Position {
  id: number;
}

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
