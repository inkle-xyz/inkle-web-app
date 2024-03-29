export interface WidgetVariable {
  id: string;
  name: string;
  description: string;
  value: string;
}

export interface Widget {
  id: string;
  name: string;
  description: string;
  isDarkMode: boolean;
  variables: WidgetVariable[];
  author: string; // Author Name
  authorName: string; // Author Email
  isPublished: boolean;
  code: string;
  likes?: number;
  isFeatured?: boolean;
  imageUrl?: string; // Only if featured
}
