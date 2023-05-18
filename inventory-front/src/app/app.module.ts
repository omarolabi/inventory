import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product-component/product.component';
import { ProductApiService } from './services/product-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArticleApiService } from './services/article-api.service';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { ProductsService } from './services/products.service';
import { InventoryComponentComponent } from './inventory-component/inventory-component.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductListComponentComponent, InventoryComponentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ArticleApiService, ProductApiService, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
