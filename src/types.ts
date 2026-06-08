export interface Agent {
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: 'apartment' | 'villa' | 'office' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: number; // in m²
  images: string[];
  agent: Agent;
  features: string[];
  yearBuilt: number;
  rating: number;
  status: 'sale' | 'rent';
  coordinates: {
    lat: number;
    lng: number;
  };
  isFeatured?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
}

export interface Testimonial {
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
