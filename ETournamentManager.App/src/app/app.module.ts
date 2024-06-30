import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';
import { NavigationComponent } from 'components/navigation/navigation.component';
import { HomeComponent } from 'components/home/home.component';
import { FooterComponent } from 'components/footer/footer.component';
import { PlayerProfileComponent } from 'components/player-profile/player-profile.component';
import { TeamsSectionComponent } from 'components/teams-section/teams-section.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HomeComponent, FooterComponent, PlayerProfileComponent, TeamsSectionComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
