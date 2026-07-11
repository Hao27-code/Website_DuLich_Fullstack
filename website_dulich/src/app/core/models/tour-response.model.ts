import { ItineraryItem } from './itinerary-item.model';
import { FaqItem } from './faq-item.model';

export interface TourResponse {
  id: string;

  title: string;

  location: string;

  days: number;

  price: number;

  discountPrice?: number;

  description: string;

  dealEndDate?: string;

  coverImage?: string;

  albumImages: string[];

  activities?: string;

  tripType?: string;

  difficulty?: string;

  isActive: boolean;

  highlights: string[];

  itineraries: ItineraryItem[];

  faqs: FaqItem[];
}
