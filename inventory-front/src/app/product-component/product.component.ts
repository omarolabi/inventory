import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  template: `
    <div class="product">
      <h3>
        {{ product?.name }} <span>{{ product?.price }}€</span>
      </h3>
      <div class="body">
        <h4>Articles needed</h4>
        <ul *ngIf="product?.articles as articles">
          <li *ngFor="let article of articles; trackBy: trackByIndex">
            <span class="header">{{ article.name }}</span
            ><span>{{ article.amount }}</span>
          </li>
        </ul>
      </div>
      <div class="actions">
        <p *ngIf="available; else notAvailable" class="available">
          {{ product?.stock }} available
        </p>
        <ng-template #notAvailable
          ><p class="not-available">Not available</p></ng-template
        >
        <button [disabled]="disabled" (click)="sellProduct()">Sell</button>
      </div>
    </div>
  `,
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product?: Product;
  @Input() disabled?: boolean;
  @Output() sellAction = new EventEmitter<Product>();

  get available(): boolean {
    return !!this.product?.stock;
  }

  sellProduct() {
    if (this.product) {
      this.sellAction.next(this.product);
    }
  }

  trackByIndex(index: number) {
    return index;
  }
}
