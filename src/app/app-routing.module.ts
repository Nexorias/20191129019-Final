import { DetailedProductSectionComponent } from './components/DetailedProduct/DetailedProductSection.component';
import { ProductSectionComponent } from './components/ProductModeration/ProductModeration.component';
import { RealEstateModerationComponent } from './components/UserModeration/RealEstateModeration.component';
import { RealEstateSectionComponent } from './components/RealEstateSection/RealEstateSection.component';
import { AdminPageComponent } from './components/AdminPage/AdminPage.component';
import { UserpageComponent } from './components/UserPage/userpage.component';
import { RegisterComponent } from './components/Registeration/register.component';
import { BasketComponent } from './components/Basket/basket.component';
import { LoginComponent } from './components/Login/login.component';
import { HomeComponent } from './components/home/home.component';
//componenet end
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'homes',
    component: RealEstateSectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
  path: 'register',
  component: RegisterComponent,
  },
   {
    path: 'userpage',
    component: UserpageComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
    {
    path: 'usermoderation',
    component: RealEstateModerationComponent,
    canActivate: [AuthGuard]
    },
    {
    path: 'products',
    component: ProductSectionComponent,
    canActivate: [AuthGuard]
    },
    {
      path: 'Details/:id',
    component: DetailedProductSectionComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
