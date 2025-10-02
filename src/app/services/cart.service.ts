import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  
  // Observable that components can subscribe to
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() {
    // Load cart from localStorage on service initialization
    this.loadCartFromStorage();
  }

  // Get current cart items
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Get cart item count
  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.qty, 0);
  }

  // Get cart subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  // Get tax (15%)
  getTax(): number {
    return this.getSubtotal() * 0.15;
  }

  // Get total
  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  // Add item to cart or update quantity if exists
  addToCart(item: CartItem): void {
    const existingItemIndex = this.cartItems.findIndex(i => i.id === item.id);
    
    if (existingItemIndex > -1) {
      // Item exists, update quantity
      this.cartItems[existingItemIndex].qty += item.qty;
    } else {
      // New item, add to cart
      this.cartItems.push({ ...item });
    }
    
    this.updateCart();
  }

  // Update item quantity
  updateQuantity(itemId: string, qty: number): void {
    const itemIndex = this.cartItems.findIndex(i => i.id === itemId);
    
    if (itemIndex > -1) {
      if (qty <= 0) {
        // Remove item if quantity is 0 or less
        this.removeFromCart(itemId);
      } else {
        this.cartItems[itemIndex].qty = qty;
        this.updateCart();
      }
    }
  }

  // Increment item quantity
  incrementQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.qty++;
      this.updateCart();
    }
  }

  // Decrement item quantity
  decrementQuantity(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      if (item.qty > 1) {
        item.qty--;
        this.updateCart();
      } else {
        this.removeFromCart(itemId);
      }
    }
  }

  // Remove item from cart
  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.updateCart();
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Check if item is in cart
  isInCart(itemId: string): boolean {
    return this.cartItems.some(item => item.id === itemId);
  }

  // Get specific item from cart
  getCartItem(itemId: string): CartItem | undefined {
    return this.cartItems.find(item => item.id === itemId);
  }

  // Private method to update cart and notify subscribers
  private updateCart(): void {
    this.saveCartToStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  // Save cart to localStorage
  private saveCartToStorage(): void {
    try {
      localStorage.setItem('bakery_cart', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  // Load cart from localStorage
  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('bakery_cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next([...this.cartItems]);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this.cartItems = [];
    }
  }
}
