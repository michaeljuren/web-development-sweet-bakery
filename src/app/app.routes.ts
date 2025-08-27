import { Routes } from '@angular/router';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { HomeComponent } from './components/home/home.component';
import { BreadComponent } from './components/breads/bread.component';
import { PastriesComponent } from './components/pastries/pastries.component';
import { CakesComponent } from './components/cakes/cakes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'order', component: OrderPageComponent },
  { path: 'breads', component: BreadComponent },
  { path: 'pastries', component: PastriesComponent },
  { path: 'cakes', component: CakesComponent }
];
