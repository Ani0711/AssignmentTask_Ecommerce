import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  products: Product[] = [];
  cartItems: CartItems[]=[];
  discountCode: string = '';
  discountApplied: boolean = false;
  discountValue: number = 0;
  productquantity:number[] = [];

  constructor(private productService: ProductService, private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => console.error('Error loading products', error)
    );
  }

  addToCart(productID: number, quantity: number): void {
    this.cartService.addToCart(productID, quantity);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  calculateTotal(): number {
    const total = this.cartService.calculateTotal(this.products);
    return this.discountApplied ? total - this.discountValue : total;
  }

  applyDiscount(): void {
    // Implement discount logic here
    if (this.discountCode === 'SAVE10' ) {
      this.discountValue = this.cartService.calculateTotal(this.products) * 0.1;
      this.discountApplied = true;
    }
    if (this.discountCode === 'SAVE20' ) {
      this.discountValue = this.cartService.calculateTotal(this.products) * 0.2;
      this.discountApplied = true;
    }
    else {
      this.discountValue = 0;
      this.discountApplied = false;
      alert('Invalid coupon code')
    }
  }
}
