export interface WidgetVariable {
  id: string;
  name: string;
  description: string;
  defaultValue: string;
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
  likes?: number;
  image?: string;
}

export interface WidgetVariableState {
  id: string;
  name: string;
  description: string;
  defaultValue: string;
}

export interface WidgetState {
  id: string
  name: string;
  description: string;
  isDarkMode: boolean;
  deployedLink: string;
}
