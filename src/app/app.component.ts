import { CommonModule } from '@angular/common';
import { Component, HostListener} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CartBadgeComponent } from "./components/cart-badge/cart-badge.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CartBadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'sweet treats bakery';

  // Navigation items
  navItems = ['Home', 'Products', 'Testimonials', 'Visit Us', 'Order'];
  activeSection = 'Home';

  // Contact info
  contactInfo = {
    phone: '088 455 1122',
    address: '123 Main Street',
    email: 'info@sweettreatsbakery.com'
  };

   private isNavigatingToSection = false;


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/order') {
          this.activeSection = 'Order';
        } else if (event.url === '/' || event.url === '/home') {
          // Only reset to Home if we're not navigating to a specific section
          if (!this.isNavigatingToSection) {
            this.activeSection = 'Home';
          }
        }
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
     if ((this.router.url === '/' || this.router.url === '/home') && !this.isNavigatingToSection) {
      this.updateActiveSection();
    }
  }

  onNavItemClick(item: string) {
   if (item === 'Order') {
      this.isNavigatingToSection = false;
      this.router.navigate(['/order']);
      return;
    }

    // For all home page sections
    this.isNavigatingToSection = true;

    if (this.router.url !== '/' && this.router.url !== '/home') {
      // If not on home page, navigate to home first
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToHomeSection(item), 200);
      });
    } else {
      // Already on home page, scroll directly
      this.scrollToHomeSection(item);
    }
  }

  private scrollToHomeSection(item: string) {
    if (item === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.activeSection = 'Home';
    } else if (item === 'Visit Us') {
      this.scrollToSection('location-section');
      this.activeSection = 'Visit Us';
    } else {
      const sectionId = item.toLowerCase() + '-section';
      this.scrollToSection(sectionId);
      this.activeSection = item;
    }

    // Reset the flag after scrolling is complete
    setTimeout(() => {
      this.isNavigatingToSection = false;
    }, 1000);
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  private updateActiveSection() {
    const sections = [
      { id: 'hero-section', name: 'Home' },
      { id: 'products-section', name: 'Products' },
      { id: 'testimonials-section', name: 'Testimonials' },
      { id: 'location-section', name: 'Visit Us' }
    ];

    const scrollPosition = window.pageYOffset + 150;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = sections[i].name;
        break;
      }
    }
  }
}
