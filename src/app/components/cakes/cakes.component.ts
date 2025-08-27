import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-cakes',
  imports: [CommonModule],
  templateUrl: './cakes.component.html',
  styleUrl: './cakes.component.css'
})
export class CakesComponent {
cakes: Product[] = [
    {
      id: 'custom-cake',
      name: 'Custom Cake (8")',
      price: 400.00,
      image: 'assets/images/products/cakes/custom-cakes.jpg',
      intro: 'Make your celebration unforgettable with our custom cakes. Choose your favorite flavor and add a personalized message to create the perfect centerpiece for your special day.',
      features: [
        'Choose from 3 delicious flavors( vanilla, chocolate, red velvet )',
        'Custom message decoration',
        'Professional buttercream frosting',
        'Fresh cake layers baked daily',
        'Serves 8-10 people',
        'Beautiful presentation ready'
      ],
      story: 'Our master decorators use premium ingredients and artistic flair to create cakes that taste as amazing as they look. From classic vanilla to rich chocolate, each cake is a canvas for your celebration.',

    },
    {
      id: 'wedding-slice',
      name: 'Wedding Cake Slice',
      price: 85.00,
      image: 'assets/images/products/cakes/red-velvet.jpg',
      intro: 'Experience the elegance of our signature wedding cake with this individual slice. Rich red velvet cake paired with smooth cream cheese frosting - a taste of luxury.',
      features: [
        'Rich red velvet sponge',
        'Cream cheese frosting',
        'Elegant presentation',
        'Perfect portion size',
        'Made with premium cocoa',
        'Signature recipe'
      ],
      story: 'Our wedding cake slice represents the pinnacle of our baking artistry. The deep red velvet cake, made with the finest cocoa and buttermilk, creates a tender crumb that pairs perfectly with our house-made cream cheese frosting.',

    }
  ];

  constructor(private router: Router) {}

  navigateToOrder(): void {
    this.router.navigate(['/order']);
  }
}
