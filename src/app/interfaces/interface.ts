export interface DailySpecial {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface ProductCategory {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface ContactInfo {
  phone: string;
  address: string;
  email: string;
}

export interface StoreHours {
  weekdays: string;
  weekends: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  intro: string;
  features: string[];
  story: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category?: string;
}

 export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: 'pickup' | 'delivery';
  address: string;
  city: string;
  zipCode: string;
  date: string;
  time: string;
  notes: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  category?: string;
}
