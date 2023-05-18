import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Product, ProductArticle } from '../models/product.model';
import { Article } from '../models/article.model';
import { ProductApiService } from './product-api.service';
import { ArticleApiService } from './article-api.service';

// TODO Implement real price
const DEFAULT_PRICE = 99;

@Injectable()
export class ProductsService {
  private inventarySubject = new BehaviorSubject<Article[]>([]);
  readonly inventory$ = this.inventarySubject.asObservable();

  private productSubject = new BehaviorSubject<Product[]>([]);
  readonly products$ = this.productSubject.asObservable();

  private updateInventorySubject$ = new Subject<void>();
  private updateInventoryEffects$ = this.updateInventorySubject$.pipe(
    switchMap(() => this.articleService.listArticles()),
    tap((inventory) => {
      this.inventarySubject.next(inventory);
      this.updateProductsSubject$.next();
    })
  );

  private updateProductsSubject$ = new Subject<void>();
  private updateProductsEffects$ = this.updateProductsSubject$.pipe(
    switchMap(() =>
      this.productService.listProducts().pipe(
        withLatestFrom(this.inventory$),
        map(([products, inventory]) =>
          products.map((product) =>
            this.createStockableProduct(product, inventory)
          )
        )
      )
    ),
    tap((products) => this.productSubject.next(products))
  );

  private deleteArticlesSubject$ = new Subject<Product>();
  private deleteArticlesEffects$ = this.deleteArticlesSubject$.pipe(
    switchMap((stockableProduct) =>
      this.articleService.deleteArticles(stockableProduct.articles)
    ),
    tap(() => this.updateInventorySubject$.next())
  );

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductApiService,
    private articleService: ArticleApiService
  ) {}

  deleteArticles(product: Product) {
    this.deleteArticlesSubject$.next(product);
  }

  private createStockableProduct(
    product: Product,
    inventory: Article[]
  ): Product {
    return {
      id: product?.id,
      name: product?.name,
      articles: this.createProductArticles(product?.articles, inventory),
      price: DEFAULT_PRICE,
      stock: this.calculateStock(product.articles, inventory),
    };
  }

  private findArticle(
    inventory: Article[],
    productArticle: ProductArticle
  ): Article | undefined {
    return inventory.find(
      (inventoryArticle) => inventoryArticle.id === productArticle.id
    );
  }

  private createProductArticles(
    productArticles: ProductArticle[],
    inventory: Article[]
  ): ProductArticle[] {
    return productArticles.map((productArticle) => {
      const inventoryArticle = this.findArticle(inventory, productArticle);

      return {
        ...productArticle,
        name: inventoryArticle ? inventoryArticle.name : '',
      };
    });
  }

  private calculateStock(
    productArticles: ProductArticle[],
    inventory: Article[]
  ): number {
    const calculatedStock = productArticles.map((productArticle) => {
      const inventoryArticle = this.findArticle(inventory, productArticle);
      return !inventoryArticle || inventoryArticle.stock < 0
        ? 0
        : this.calculateArticleSets(
            inventoryArticle.stock,
            productArticle.amount
          );
    });

    return Math.min(...calculatedStock);
  }

  private calculateArticleSets(
    articleStock: number,
    articleAmount: number
  ): number {
    let articleSets: number;
    articleSets = Math.floor(articleStock / articleAmount);
    return articleSets;
  }

  init() {
    merge(
      this.updateInventoryEffects$,
      this.updateProductsEffects$,
      this.deleteArticlesEffects$
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.updateInventorySubject$.next();
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
