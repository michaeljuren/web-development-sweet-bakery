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
