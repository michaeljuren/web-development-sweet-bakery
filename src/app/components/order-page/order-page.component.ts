import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  qty: number;
}

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
      qty: 0
    },
    {
      id: 'wholewheat',
      name: 'Whole Wheat Bread',
      description: 'Hearty whole grain with seeds',
      price: 50.00,
      qty: 0
    },
    {
      id: 'baguette',
      name: 'French Baguette',
      description: 'Crispy crust, soft interior',
      price: 25.50,
      qty: 0
    }
  ];

  pastryItems: MenuItem[] = [
    {
      id: 'croissant',
      name: 'Butter Croissant',
      description: 'Flaky, buttery layers',
      price: 12.75,
      qty: 0
    },
    {
      id: 'muffin',
      name: 'Blueberry Muffin',
      description: 'Fresh blueberries, lemon zest',
      price: 18.50,
      qty: 0
    },
    {
      id: 'cookie',
      name: 'Chocolate Chip Cookie',
      description: 'Chewy with premium chocolate',
      price: 6.50,
      qty: 0
    }
  ];

  cakeItems: MenuItem[] = [
    {
      id: 'custom',
      name: 'Custom Cake (8")',
      description: 'Vanilla, chocolate, or red velvet, custom message',
      price: 400.00,
      qty: 0
    },
    {
      id: 'wedding',
      name: 'Wedding Cake Slice',
      description: 'Red velvet with cream cheese frosting',
      price: 85.00,
      qty: 0
    }
  ];

  notificationMessage = '';
  showNotification = false;

  get cartItems(): MenuItem[] {
    return [...this.breadItems, ...this.pastryItems, ...this.cakeItems]
      .filter(item => item.qty > 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  get tax(): number {
    return this.subtotal * 0.15;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  updateQuantity(item: MenuItem, change: number): void {
    const newQty = Math.max(0, item.qty + change);
    item.qty = newQty;

    if (change > 0) {
      this.showNotificationMessage(`Added ${item.name} to cart!`);
    }
  }

  checkout(): void {
    this.showNotificationMessage('Order placed successfully! Thank you!');

    // Reset all quantities
    [...this.breadItems, ...this.pastryItems, ...this.cakeItems]
      .forEach(item => item.qty = 0);
  }

  private showNotificationMessage(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
