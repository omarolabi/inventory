import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list-component',
  template: `
    <div class="product-list">
      <h2>Products</h2>
      <app-product
        *ngFor="let product of products; trackBy: trackByIndex"
        [disabled]="isDisabled(product.stock)"
        [product]="product"
        (sellAction)="onSellAction($event)"
      ></app-product>
    </div>
  `,
  styleUrls: ['./product-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponentComponent {
  @Input() products?: Product[];
  @Output() sellAction = new EventEmitter<Product>();

  onSellAction(stockableProduct: Product) {
    this.sellAction.emit(stockableProduct);
  }

  isDisabled(stock: number | undefined): boolean {
    return !stock;
  }

  trackByIndex(index: number) {
    return index;
  }
}
