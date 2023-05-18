import { Component, Input } from '@angular/core';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-inventory-component',
  template: `
    <div class="inventory">
      <h2>Inventory</h2>
      <ul>
        <li *ngFor="let article of inventory; trackBy: trackByIndex">
          <span class="header">{{ article.name }}</span
          ><span>{{ article.stock }}</span>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./inventory-component.component.scss'],
})
export class InventoryComponentComponent {
  @Input() inventory?: Article[];

  trackByIndex(index: number) {
    return index;
  }
}
