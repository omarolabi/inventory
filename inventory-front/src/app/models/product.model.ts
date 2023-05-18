export interface ProductArticleApi {
  amount_of: string;
  art_id: string;
}

export interface ProductApi {
  contain_articles: ProductArticleApi[];
  name: string;
}

export interface ProductArticle {
  amount: number;
  id: number;
  name?: string;
}

export interface Product {
  id: string;
  articles: ProductArticle[];
  name: string;
  price?: number;
  stock?: number;
}
