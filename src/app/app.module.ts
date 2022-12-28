import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { AppComponent } from './app.component';
import { RotaComponent } from './pages/rota/rota.component';
import { NavbarleftComponent } from './components/navbarleft/navbarleft.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewMapComponent } from './components/view-map/view-map.component';
import { LocationService } from './services/location.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    RotaComponent,
    NavbarleftComponent,
    HeaderComponent,
    ViewMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
