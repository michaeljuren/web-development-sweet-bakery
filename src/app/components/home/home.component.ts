import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Daily specials data
  dailySpecials = [
    {
      id: 1,
      name: 'Artisan Sourdough',
      description: 'Fresh baked with our 100-year-old starter',
      price: 'R45.00',
      image: 'assets/images/products/breads/sourdough.jpg'
    },
    {
      id: 2,
      name: 'Chocolate Croissants',
      description: 'Buttery pastry with Belgian chocolate',
      price: 'R35.50',
      image: 'assets/images/products/pastries/chocolate-croissant.jpg'
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies',
      description: 'Classic cookies with a hint of chocolate',
      price: 'R18.00',
      image: 'assets/images/products/pastries/chocolate-chip-cookie.jpg'

    }
  ];

  // Product categories
  productCategories = [
    {
      title: 'Artisan Breads',
      description: 'Fresh daily varieties',
      image: 'assets/images/products/breads/sourdough.jpg',
      icon: '🍞'
    },
    {
      title: 'Pastries & Sweets',
      description: 'Croissants, muffins, cookies',
      image: 'assets/images/products/pastery-header.jpg',
      icon: '🥐'
    },
    {
      title: 'Custom Cakes',
      description: 'Special occasions',
      image: 'assets/images/products/cake-header.jpg',
      icon: '🎂'
    }
  ];

  // Customer testimonials
  testimonials = [
    {
      text: "The best bakery in town! Their sourdough is absolutely incredible and the staff is so friendly.",
      author: "Sarah Johnson"
    },
    {
      text: "I order custom cakes for all my family celebrations. They never disappoint with quality and creativity!",
      author: "Michael-John Uren"
    },
    {
      text: "Delicious pastries and sourdough bread. The staff is friendly and the bakery is clean and well-organized.",
      author: "John Doe"
    }
  ];

  // Carousel tracking
  currentSpecialIndex = 0;

  // Store hours
  storeHours = {
    weekdays: 'Mon-Fri: 6AM - 6PM',
    weekends: 'Sat-Sun: 7AM - 4PM'
  };

  // Contact info
  contactInfo = {
    phone: ' 088 455 1122',
    address: '123 Main Street',
    email: 'info@sweettreatssbakery.com'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Auto-rotate daily specials
    setInterval(() => {
      this.nextSpecial();
    }, 4000);
  }

  nextSpecial() {
    this.currentSpecialIndex = (this.currentSpecialIndex + 1) % this.dailySpecials.length;
  }

  previousSpecial() {
    this.currentSpecialIndex = this.currentSpecialIndex === 0
      ? this.dailySpecials.length - 1
      : this.currentSpecialIndex - 1;
  }

  setSpecial(index: number) {
    this.currentSpecialIndex = index;
  }

  onOrderNow() {
    this.router.navigate(['/order']);
    console.log('Navigate to order page');
  }

  navigateToCategory( category: any) {
 if (category.title === 'Artisan Breads') {
    this.router.navigate(['/breads']);
  }
  else if (category.title === 'Pastries & Sweets') {
    this.router.navigate(['/pastries']);
  }
  else if (category.title === 'Custom Cakes') {
    this.router.navigate(['/cakes']);
  }
  else {
    this.router.navigate(['/order']);
  }
}
}


