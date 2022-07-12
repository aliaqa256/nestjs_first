export interface Category {
  id?: string;
  category_name: string;
  parent: Category;
  is_parent: boolean;
}
