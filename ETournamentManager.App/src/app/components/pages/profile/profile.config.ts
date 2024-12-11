import { AccessPermissionsComponent } from 'app/components/dialogs/access-permissions/access-permissions.component';
import { PlatformInfoComponent } from 'app/components/dialogs/platform-info/platform-info.component';
import { ThemePickerComponent } from 'app/components/dialogs/theme-picker/theme-picker.component';

export type PlatformConfig = {
  component: any;
};

export const PLATFORM_CONFIGS: PlatformConfig[] = [
  { component: AccessPermissionsComponent },
  { component: ThemePickerComponent },
  { component: PlatformInfoComponent },
];
