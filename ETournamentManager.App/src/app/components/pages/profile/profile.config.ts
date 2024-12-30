import { AccessPermissionsComponent } from 'app/components/dialogs/access-permissions/access-permissions.component';
import { LogoChangeComponent } from 'app/components/dialogs/logo-change/logo-change.component';
import { PlatformInfoComponent } from 'app/components/dialogs/platform-info/platform-info.component';
import { ThemePickerComponent } from 'app/components/dialogs/theme-picker/theme-picker.component';
import { USER_ROLES } from 'app/utils/constants';
import { NavPanelItem } from 'app/utils/types';

export type PlatformConfig = {
  component: any;
};

export type ChangeUsernameRequest = {
  username: string;
};

export const PLATFORM_CONFIGS: NavPanelItem[] = [
  {
    title: 'Logo change',
    buttonText: 'Config',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: LogoChangeComponent,
  },
  {
    title: 'Access Permissions',
    buttonText: 'Config',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: AccessPermissionsComponent,
  },
  {
    title: 'Theme Picker',
    buttonText: 'Config',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: ThemePickerComponent,
  },
  {
    title: 'Platform Info',
    buttonText: 'Config',
    imageUrl: 'assets/images/home-panel-tournament-table.png',
    roles: [USER_ROLES.ADMIN],
    dialogComponent: PlatformInfoComponent,
  },
];
