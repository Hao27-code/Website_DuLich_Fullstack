export interface ItineraryItem {
  dayNumber: number;

  title: string;

  description: string;

  expanded?: boolean;
  descriptionLines?: string[];
}
