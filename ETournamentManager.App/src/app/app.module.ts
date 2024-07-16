import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { NavigationComponent } from 'app/components/navigation/navigation.component';
import { HomeComponent } from 'app/components/pages/home/home.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { PlayerProfileComponent } from 'app/components/pages/player-profile/player-profile.component';
import { TeamsSectionComponent } from 'app/components/teams-section/teams-section.component';
import { LoginComponent } from 'app/components/pages/login/login.component';
import { HeadersInterceptor } from 'app/interceptors/headers.interceptor';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { RegisterComponent } from 'app/components/pages/register/register.component';
import { EInputComponent } from './components/core/e-input/e-input.component';
import { EFormComponent } from './components/core/e-form/e-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    PlayerProfileComponent,
    TeamsSectionComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    EInputComponent,
    EFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
