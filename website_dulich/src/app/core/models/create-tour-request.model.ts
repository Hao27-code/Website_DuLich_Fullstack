export interface CreateTourRequest {
  title: string;

  location: string;

  days: number;

  price: number;

  discountPrice?: number;

  description: string;

  dealEndDate?: string;

  coverImage?: string;

  activities?: string;

  tripType?: string;

  difficulty?: string;
}
