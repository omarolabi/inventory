import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article, ArticleApi, ArticlePostApi } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { ACTIONS, API_URL, ENDPOINTS } from 'src/environment';
import { ProductArticle } from '../models/product.model';

const ARTICLES_API_URL = API_URL + ENDPOINTS.articles;

@Injectable()
export class ArticleApiService {
  constructor(private httpClient: HttpClient) {}

  listArticles(): Observable<Article[]> {
    return (
      this.httpClient
        .get<ArticleApi[]>(ARTICLES_API_URL)
        // TODO manage errors
        .pipe(map((response) => this.deserializeArticles(response)))
    );
  }

  deleteArticles(articles: ProductArticle[]): Observable<ArticlePostApi[]> {
    const URL = ARTICLES_API_URL + ACTIONS.delete;
    // TODO manage errors
    return this.httpClient.post<any>(URL, this.serializeArticlesPost(articles));
  }

  private deserializeArticles(articles: ArticleApi[]): Article[] {
    return articles.map((article) => ({
      id: +article.art_id,
      name: article.name,
      stock: +article.stock,
    }));
  }

  private serializeArticlesPost(articles: ProductArticle[]): ArticlePostApi[] {
    return articles.map((article) => ({
      art_id: article.id.toString(),
      amount: article.amount.toString(),
    }));
  }
}
