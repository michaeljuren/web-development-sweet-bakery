import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-pastries',
  imports: [CommonModule],
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.css'
})
export class PastriesComponent {
    pasteries: Product[] = [
    {
      id: 'croissant',
      name: 'Butter Croissant',
      price: 12.75,
      image: 'assets/images/products/pastries/butter-croissant.jpg',
      intro: 'Our butter croissant is a classic French pastry, made with a soft, flaky crust and a creamy buttery filling.',
      features: [
        'Made with high-quality butter',
        'Flaky, layered texture',
        'Crispy golden crust',
        'Creamy buttery filling'
      ],
      story: 'We use only the freshest ingredients and traditional techniques to create a soft, buttery croissant that is both delicious and satisfying.'
    },
    {
      id: 'muffin',
      name: 'Blueberry Muffin',
      price: 18.50,
      image: 'assets/images/products/pastries/blueberry-muffin.jpg',
      intro: 'Stuffed with the goodness of fresh blueberries, our muffin is a delightful combination of sweet and savory.',
      features: [
        'Bursting with fresh blueberries',
        'Moist and tender crumb',
        'Perfect for breakfast or a snack'
      ],
      story: 'Using only the freshest blueberries and high-quality ingredients, we create a muffin that is both delicious and satisfying.'
    },
    {
      id: 'cookie',
      name: 'Chocolate Chip Cookie',
      price: 6.50,
      image: 'assets/images/products/pastries/chocolate-chip-cookie.jpg',
      intro: 'Our classic chocolate chip cookie is a warm and comforting treat.',
      features: [
        'Loaded with premium chocolate chips',
        'Chewy and soft texture',
        'Perfect for any occasion'
      ],
      story: 'Using only the finest ingredients, we create a cookie that is both delicious and satisfying.'

    }
  ];

  constructor(private router: Router) {}

  navigateToOrder(): void {
    this.router.navigate(['/order']);
  }

}
