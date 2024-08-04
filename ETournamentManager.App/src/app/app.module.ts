import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { EFormComponent } from 'app/components/core/e-form/e-form.component';
import { EInputComponent } from 'app/components/core/e-input/e-input.component';
import { ESwitchComponent } from 'app/components/core/e-switch/e-switch.component';
import { FooterComponent } from 'app/components/footer/footer.component';
import { NavigationComponent } from 'app/components/navigation/navigation.component';
import { LoginComponent } from 'app/components/pages/auth/login/login.component';
import { RegisterComponent } from 'app/components/pages/auth/register/register.component';
import { GameCreateComponent } from 'app/components/pages/game/game-create/game-create.component';
import { HomeComponent } from 'app/components/pages/home/home.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { PlayerProfileComponent } from 'app/components/pages/player-profile/player-profile.component';
import { TeamCreateComponent } from 'app/components/pages/team/team-create/team-create.component';
import { TeamDetailsComponent } from 'app/components/pages/team/team-details/team-details.component';
import { TournamentCreateComponent } from 'app/components/pages/tournament-create/tournament-create.component';
import { TeamsSectionComponent } from 'app/components/teams-section/teams-section.component';
import { HeadersInterceptor } from 'app/interceptors/headers.interceptor';
import { EImageUploadComponent } from './components/core/e-image-upload/e-image-upload.component';

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
    ESwitchComponent,
    TeamCreateComponent,
    TeamDetailsComponent,
    TournamentCreateComponent,
    GameCreateComponent,
    EImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
