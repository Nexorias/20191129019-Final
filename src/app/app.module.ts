import { DetailedProductSectionComponent } from './components/DetailedProduct/DetailedProductSection.component';
import { ProductSectionComponent } from './components/ProductModeration/ProductModeration.component';
import { RealEstateModerationComponent } from './components/UserModeration/RealEstateModeration.component';
import { RealEstateSectionComponent } from './components/RealEstateSection/RealEstateSection.component';
import { RegisterComponent } from './components/Registeration/register.component';
import { AdminPageComponent } from './components/AdminPage/AdminPage.component';
import { LoginComponent } from './components/Login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MytoastService } from './services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire/compat';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RealEstateSectionComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    RealEstateModerationComponent,
    ProductSectionComponent,
    DetailedProductSectionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    provideRemoteConfig(() => getRemoteConfig())
  ],
  providers: [DataService, MytoastService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
