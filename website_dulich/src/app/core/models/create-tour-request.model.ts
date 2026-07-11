import { ItineraryItem } from './itinerary-item.model';
import { FaqItem } from './faq-item.model';

export interface CreateTourRequest {
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

  //điểm nổi bật
  highlights: string[];
  //lịch trình
  itineraries: ItineraryItem[];
  //faq
  faqs: FaqItem[];
}
