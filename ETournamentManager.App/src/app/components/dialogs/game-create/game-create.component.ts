import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import { GAME_CREATE_FORM_MODEL } from './game-create.configuration';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrl: './game-create.component.scss',
})
export class GameCreateComponent {
  name: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  onFormChanged({ name }: GAME_CREATE_FORM_MODEL) {
    this.name = name;
  }

  onCreateClick() {
    this.apiService
      .request<string, GAME_CREATE_FORM_MODEL>({
        url: SERVER_ROUTES.GAME.CREATE,
        method: 'post',
        body: {
          name: this.name,
        },
      })
      .subscribe({
        // next: (id) => this.router.navigate(['/team', id]),
        error: (error) => (this.errorMessage = error),
      });
  }
}
