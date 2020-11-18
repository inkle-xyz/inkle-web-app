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
  owner: string; // Who owns the deployed instance
  author: string; // Author Name
  authorName: string; // Author Email
  isPublished: boolean;
  code: string;
  likes?: number;
  image?: string;
}
