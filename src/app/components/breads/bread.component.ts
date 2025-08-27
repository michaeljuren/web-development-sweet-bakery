import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interface';

@Component({
  selector: 'app-bread',
  imports: [CommonModule],
  templateUrl: './bread.component.html',
  styleUrl: './bread.component.css'
})
export class BreadComponent {

  breads: Product[] = [
    {
      id: 'sourdough',
      name: 'Sourdough Loaf',
      price: 45.50,
      image: 'assets/images/products/breads/sourdough.jpg',
      intro: 'Our signature sourdough, crafted with a 100-year-old starter that gives it its distinctive tangy flavor and perfect texture.',
      features: [
        '24-hour fermentation process',
        'Wild yeast starter culture',
        'Crispy golden crust',
        'Soft, airy interior with large holes',
        'Natural preservation - stays fresh longer'
      ],
      story: 'Our sourdough journey began when our master baker inherited a century-old starter from her grandmother. This living culture has been nurtured daily, creating bread with complex flavors that can only come from time and tradition. Each loaf represents generations of baking expertise.'
    },
    {
      id: 'wholewheat',
      name: 'Whole Wheat Bread',
      price: 50.00,
      image: 'assets/images/products/breads/wholewheat.jpg',
      intro: 'Hearty and nutritious, made with stone-ground whole wheat flour and a blend of ancient grains for exceptional flavor and texture.',
      features: [
        'Stone-ground whole wheat flour',
        'Ancient grain blend (quinoa, millet, flax)',
        'Rich in fiber and protein',
        'Naturally sweetened with honey',
        'Perfectly balanced nutty flavor'
      ],
      story: 'We source our wheat from local organic farms, ensuring every grain is of the highest quality. Our stone-grinding process preserves the natural oils and nutrients, while our careful blend of ancient grains adds complexity and nutrition to every slice.'
    },
    {
      id: 'baguette',
      name: 'French Baguette',
      price: 25.50,
      image: 'assets/images/products/breads/baguette.jpg',
      intro: 'Authentic French baguette with a crackling crust and delicate crumb, made using traditional techniques passed down through generations.',
      features: [
        'Traditional French technique',
        'Steam-baked for perfect crust',
        'Light, airy texture',
        'Distinctive scoring pattern',
        'Best enjoyed fresh on the day'
      ],
      story: 'Our head baker trained in Lyon, France, learning the art of perfect baguette making. Using only four ingredients - flour, water, salt, and yeast - we create magic through technique, timing, and passion. Each baguette is hand-shaped and scored for the perfect aesthetic.'
    }
  ];

  constructor(private router: Router) {}

  navigateToOrder(): void {
    this.router.navigate(['/order']);
  }

}
