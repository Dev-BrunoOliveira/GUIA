export interface Restaurant {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  instagramUrl: string;
  category?: string;
  rating?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  neighborhood?: string;
  googleMapsUrl?: string;
  highlights?: string[];
  features?: string[];
}