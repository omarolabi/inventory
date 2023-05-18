export interface ArticleApi {
  art_id: string;
  name: string;
  stock: string;
}

export interface ArticlePostApi {
  amount: string;
  art_id: string;
}

export interface Article {
  id: number;
  name: string;
  stock: number;
}
