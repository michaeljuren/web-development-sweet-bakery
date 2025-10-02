import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, CheckoutData } from '../../interfaces/interface';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  
  cartItems: CartItem[] = [];
  private cartSubscription?: Subscription;

  checkoutData: CheckoutData = {
    fullName: '',
    email: '',
    phone: '',
    deliveryMethod: 'pickup',
    address: '',
    city: '',
    zipCode: '',
    date: '',
    time: '',
    notes: ''
  };

  showSuccessModal = false;
  orderNumber = '';
  minDate = '';

  constructor(private router: Router,
              private cartService: CartService
  ) {}

   ngOnInit(): void {
    // Subscribe to cart changes
    this.cartSubscription = this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      
      // Redirect to order page if cart is empty
      if (items.length === 0) {
        // Optional: uncomment to auto-redirect
        // this.router.navigate(['/order']);
      }
    });

    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  get subtotal(): number {
    return this.cartService.getSubtotal();
  }

  get tax(): number {
    return this.cartService.getTax();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  submitOrder(): void {
    // Validate required fields
    if (!this.checkoutData.fullName || !this.checkoutData.email || 
        !this.checkoutData.phone || !this.checkoutData.date || !this.checkoutData.time) {
      return;
    }

    if (this.checkoutData.deliveryMethod === 'delivery') {
      if (!this.checkoutData.address || !this.checkoutData.city || !this.checkoutData.zipCode) {
        return;
      }
    }

    // Generate order number
    this.orderNumber = 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Show success modal
    this.showSuccessModal = true;

    // In a real app, send data to backend
    console.log('Order submitted:', {
      orderNumber: this.orderNumber,
      items: this.cartItems,
      checkout: this.checkoutData,
      total: this.total
    });

    // Clear cart after successful order
    this.cartService.clearCart();
  }

  closeModal(): void {
    this.showSuccessModal = false;
  }

  closeModalAndNavigate(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/']);
  }

  navigateToOrder(): void {
    this.router.navigate(['/order']);
  }
}
