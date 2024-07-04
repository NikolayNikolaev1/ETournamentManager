import { Component } from '@angular/core';

import * as Constants from 'app/utils/constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  constants = Constants;
}
