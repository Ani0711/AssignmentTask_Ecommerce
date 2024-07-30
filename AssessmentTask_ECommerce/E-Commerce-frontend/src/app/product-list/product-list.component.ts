import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  newProduct: Product = { productID:0, productName: '', price: 0, CartItems: [], SalesItems: []};
  loading:boolean = false;
  error:string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    
  
  }

  addProduct(): void {
    this.loading = true;
    this.error = null;
    this.productService.addProduct(this.newProduct).subscribe(
      product => {
        this.products.push(this.newProduct);
        this.newProduct= {productID: 0, productName: '', price: 0,CartItems:[],SalesItems:[]};
        this.loading = false;
      },
      error => {
        console.error(error);
        this.error = 'Failed to add product';
        this.loading =false;
      }
    );
      }
    
      saveProduct(): void {
        if (this.selectedProduct) {
          this.productService.updateProduct(this.selectedProduct).subscribe(
            updatedProduct => {
              // Handle successful update
              console.log('Product updated:', updatedProduct);
            },
            error => {
              // Handle error
              console.error('Error updating product:', error);
            }
          );
        }
      }

  
      editProduct(product: Product): void {
        this.selectedProduct = { ...product }; // Clone the product to avoid direct modifications
      }
      cancelEdit(): void {
        this.selectedProduct = null; // Clear the selected product
      }
    
  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    );
  }

  deleteProduct(id: number): void {
    this.loading = true;
    this.error = null;

    this.productService.deleteProduct(id).subscribe(
      () => this.loadProducts(),
    
    error => {
      this.error = 'Failed to delete Prodcut';
      this.loading = false;
    });
  }

}
