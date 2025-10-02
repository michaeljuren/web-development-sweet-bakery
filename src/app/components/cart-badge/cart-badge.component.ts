import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-badge',
  imports: [CommonModule],
  templateUrl: './cart-badge.component.html',
  styleUrl: './cart-badge.component.css'
})
export class CartBadgeComponent implements OnInit, OnDestroy {
  cartCount = 0;
  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  goToCheckout(): void {
    if (this.cartCount > 0) {
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/order']);
    }
  }
}
