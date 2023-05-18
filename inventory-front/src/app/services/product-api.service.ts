import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Product,
  ProductApi,
  ProductArticle,
  ProductArticleApi,
} from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { API_URL, ENDPOINTS } from 'src/environment';

const PRODUCTS_API_URL = API_URL + ENDPOINTS.products;
@Injectable()
export class ProductApiService {
  constructor(private httpClient: HttpClient) {}

  listProducts(): Observable<Product[]> {
    return (
      this.httpClient
        .get<ProductApi[]>(PRODUCTS_API_URL)
        // TODO manage errors
        .pipe(map((response) => this.deserializeProducts(response)))
    );
  }

  private deserializeProducts(products: ProductApi[]): Product[] {
    return products.map((product) => ({
      id: product.name,
      name: product.name,
      articles: this.deserializeProductArticles(product.contain_articles),
    }));
  }

  private deserializeProductArticles(
    productArticles: ProductArticleApi[]
  ): ProductArticle[] {
    return productArticles.map((productArticle) => ({
      id: +productArticle.art_id,
      amount: +productArticle.amount_of,
    }));
  }
}
