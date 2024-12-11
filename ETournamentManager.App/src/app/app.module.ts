import { GoogleChartsModule } from 'angular-google-charts';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogCloseDirective } from '@ngneat/dialog';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { AccessPermissionsComponent } from 'app/components/dialogs/access-permissions/access-permissions.component';
import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import { EAdminManagementComponent } from 'app/components/core/e-admin-management/e-admin-management.component';
import { EButtonComponent } from 'app/components/core/e-button/e-button.component';
import { EFormComponent } from 'app/components/core/e-form/e-form.component';
import { EImageUploadComponent } from 'app/components/core/e-image-upload/e-image-upload.component';
import { EInfoCardComponent } from 'app/components/core/e-info-card/e-info-card.component';
import { EInputComponent } from 'app/components/core/e-input/e-input.component';
import { ESwitchComponent } from 'app/components/core/e-switch/e-switch.component';
import { ETableComponent } from 'app/components/core/e-table/e-table.component';
import { PlatformInfoComponent } from 'app/components/dialogs/platform-info/platform-info.component';
import { ThemePickerComponent } from 'app/components/dialogs/theme-picker/theme-picker.component';
import { FooterComponent } from 'app/components/layouts/footer/footer.component';
import { NavigationComponent } from 'app/components/layouts/navigation/navigation.component';
import { LoginComponent } from 'app/components/dialogs/login/login.component';
import { PasswordChangeComponent } from 'app/components/dialogs/password-change/password-change.component';
import { RegisterComponent } from 'app/components/dialogs/register/register.component';
import { GameCreateComponent } from 'app/components/dialogs/game-create/game-create.component';
import { HomeComponent } from 'app/components/pages/home/home.component';
import { NotFoundComponent } from 'app/components/pages/not-found/not-found.component';
import { ProfileComponent } from 'app/components/pages/profile/profile.component';
import { TeamManagementComponent } from 'app/components/dialogs/team-management/team-management.component';
import { TeamDetailsComponent } from 'app/components/pages/team/team-details/team-details.component';
import { TeamTableComponent } from 'app/components/pages/team/team-table/team-table.component';
import { TournamentManagementComponent } from 'app/components/pages/tournament/tournament-management/tournament-management.component';
import { TournamentDetailsComponent } from 'app/components/pages/tournament/tournament-details/tournament-details.component';
import { TournamentTableComponent } from 'app/components/pages/tournament/tournament-table/tournament-table.component';
import { UserTableComponent } from 'app/components/dialogs/user-table/user-table.component';
import { TournamentBracketComponent } from 'app/components/tournament-bracket/tournament-bracket.component';
import { HeadersInterceptor } from 'app/interceptors/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    EInputComponent,
    EFormComponent,
    ESwitchComponent,
    TeamManagementComponent,
    TeamDetailsComponent,
    TournamentManagementComponent,
    GameCreateComponent,
    EImageUploadComponent,
    TournamentDetailsComponent,
    EInfoCardComponent,
    TournamentBracketComponent,
    EAdminManagementComponent,
    TournamentTableComponent,
    ETableComponent,
    TeamTableComponent,
    PasswordChangeComponent,
    UserTableComponent,
    EButtonComponent,
    ConfirmationComponent,
    ThemePickerComponent,
    AccessPermissionsComponent,
    PlatformInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogCloseDirective,
    GoogleChartsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
