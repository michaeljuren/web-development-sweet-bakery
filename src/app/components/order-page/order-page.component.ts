import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, MenuItem } from '../../interfaces/interface';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  breadItems: MenuItem[] = [
    {
      id: 'sourdough',
      name: 'Sourdough Loaf',
      description: 'Traditional sourdough, fermented for 24 hours',
      price: 45.50,
      qty: 0,
      category: 'bread'
    },
    {
      id: 'wholewheat',
      name: 'Whole Wheat Bread',
      description: 'Hearty whole grain with seeds',
      price: 50.00,
      qty: 0,
      category: 'bread'
    },
    {
      id: 'baguette',
      name: 'French Baguette',
      description: 'Crispy crust, soft interior',
      price: 25.50,
      qty: 0,
      category: 'bread'
    }
  ];

  pastryItems: MenuItem[] = [
    {
      id: 'croissant',
      name: 'Butter Croissant',
      description: 'Flaky, buttery layers',
      price: 12.75,
      qty: 0,
      category: 'pastry'
    },
    {
      id: 'muffin',
      name: 'Blueberry Muffin',
      description: 'Fresh blueberries, lemon zest',
      price: 18.50,
      qty: 0,
      category: 'pastry'
    },
    {
      id: 'cookie',
      name: 'Chocolate Chip Cookie',
      description: 'Chewy with premium chocolate',
      price: 6.50,
      qty: 0,
      category: 'pastry'
    }
  ];

  cakeItems: MenuItem[] = [
    {
      id: 'custom',
      name: 'Custom Cake (8")',
      description: 'Vanilla, chocolate, or red velvet, custom message',
      price: 400.00,
      qty: 0,
      category: 'cake'
    },
    {
      id: 'wedding',
      name: 'Wedding Cake Slice',
      description: 'Red velvet with cream cheese frosting',
      price: 85.00,
      qty: 0,
      category: 'cake'
    }
  ];

  notificationMessage = '';
  showNotification = false;
  cartItems: CartItem[] = [];
  private cartSubscription?: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartSubscription = this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Get quantity for a specific item
  getItemQuantity(itemId: string): number {
    const cartItem = this.cartService.getCartItem(itemId);
    return cartItem ? cartItem.qty : 0;
  }

  // Update item quantity
  updateQuantity(item: MenuItem, change: number): void {
    const currentQty = this.getItemQuantity(item.id);
    const newQty = currentQty + change;

    if (newQty <= 0) {
      this.cartService.removeFromCart(item.id);
      if (change < 0) {
        this.showNotificationMessage(`Removed ${item.name} from cart`);
      }
    } else if (currentQty === 0 && change > 0) {
      // Adding new item to cart
      this.cartService.addToCart({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        qty: change,
        category: item.category ?? ''
      });
      this.showNotificationMessage(`Added ${item.name} to cart!`);
    } else {
      // Updating existing item
      this.cartService.updateQuantity(item.id, newQty);
      if (change > 0) {
        this.showNotificationMessage(`Updated ${item.name} quantity`);
      }
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

  get cartCount(): number {
    return this.cartService.getCartCount();
  }

  navigateToCheckOut(): void {
    if (this.cartItems.length === 0) {
      this.showNotificationMessage('Your cart is empty!');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  private showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

}
