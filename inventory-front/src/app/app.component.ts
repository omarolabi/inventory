import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from './models/product.model';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <div class="app-shell">
      <app-product-list-component
        *ngIf="updatedProducts$ | async as products"
        [products]="products"
        (sellAction)="onSellAction($event)"
      ></app-product-list-component>
      <app-inventory-component
        *ngIf="inventory$ | async as inventory"
        [inventory]="inventory"
      ></app-inventory-component>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Inventory Application';

  inventory$ = this.productsService.inventory$;
  updatedProducts$ = this.productsService.products$;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.init();
  }

  onSellAction(product: Product) {
    this.productsService.deleteArticles(product);
  }

  ngOnDestroy() {
    this.productsService.destroy();
  }
}
