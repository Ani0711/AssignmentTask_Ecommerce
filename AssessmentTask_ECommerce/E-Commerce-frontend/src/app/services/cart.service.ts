import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItems } from '../models/cartItems';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItems[]> = new BehaviorSubject<CartItems[]>([]);
  private cartItems: CartItems[] = [];

  constructor() { }

  getCartItems(): Observable<CartItems[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(productID:number, quantity: number): void {
    const existingItem = this.cartItems.find(item => item.productId === productID);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ cartItems: 0, productId: productID, quantity });
    }

    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  calculateTotal(products: Product[]): number {
    return this.cartItems.reduce((total, item) => {
      const product = products.find(p => p.productID === item.productId);
      return total + (product ? product.price * item.quantity : 0.1);
    }, 0);
  }
}
