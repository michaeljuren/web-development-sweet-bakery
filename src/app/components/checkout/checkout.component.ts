import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem, CheckoutData } from '../../interfaces/interface';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  // Mock cart items - in a real app, this would come from a service
  cartItems: CartItem[] = [
    { id: 'sourdough', name: 'Sourdough Loaf', price: 6.50, qty: 2 },
    { id: 'croissant', name: 'Butter Croissant', price: 2.75, qty: 4 },
    { id: 'birthday', name: 'Birthday Cake (8")', price: 25.00, qty: 1 }
  ];

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  get tax(): number {
    return this.subtotal * 0.085;
  }

  get total(): number {
    return this.subtotal + this.tax;
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

    // In a real app, you would send this data to a backend service
    console.log('Order submitted:', {
      orderNumber: this.orderNumber,
      items: this.cartItems,
      checkout: this.checkoutData,
      total: this.total
    });
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
