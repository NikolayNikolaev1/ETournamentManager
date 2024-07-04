import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { NavigationComponent } from 'app/components/navigation/navigation.component';
import { HomeComponent } from 'app/components/home/home.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { PlayerProfileComponent } from 'app/components/player-profile/player-profile.component';
import { TeamsSectionComponent } from 'app/components/teams-section/teams-section.component';
import { LoginComponent } from 'app/components/login/login.component';
import { HeadersInterceptor } from 'app/interceptors/headers.interceptor';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HomeComponent, FooterComponent, PlayerProfileComponent, TeamsSectionComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
