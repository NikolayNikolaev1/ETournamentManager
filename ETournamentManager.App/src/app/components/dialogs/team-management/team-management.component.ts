import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogRef, DialogService } from '@ngneat/dialog';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import { TEAM_CREATE_FORM_MODEL } from './team-management.configuration';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss',
})
export class TeamManagementComponent implements OnInit {
  name: string = '';
  tag: string = '';
  description: string = '';
  errorMessage: string = '';
  teamId: string = '';
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private readonly dialogService: DialogService,
    private ref: DialogRef<{
      teamId: string;
      name: string;
      tag: string;
      description: string;
    }>
  ) {}

  ngOnInit() {
    
    if (this.ref.data) {
      console.log(this.ref.data);
      this.teamId = this.ref.data.teamId;
      this.isEdit = true;
      this.name = this.ref.data.name;
      this.tag = this.ref.data.tag;
      this.description = this.ref.data.description;
    }
  }

  onFormChanged({ name, tag, description }: TEAM_CREATE_FORM_MODEL) {
    this.name = name;
    this.tag = tag;
    this.description = description;
  }

  onCreateClick() {
    this.apiService
      .request<string, TEAM_CREATE_FORM_MODEL>({
        url: this.isEdit
          ? `${SERVER_ROUTES.TEAM.UPDATE}/${this.teamId}`
          : SERVER_ROUTES.TEAM.CREATE,
        method: this.isEdit ? 'patch' : 'post',
        body: {
          name: this.name,
          tag: this.tag,
          description: this.description,
        },
      })
      .subscribe({
        next: (id) => {
          this.dialogService.closeAll();

          this.router.navigate(['/team', id]);
        },
        error: (error) => (this.errorMessage = error),
      });
  }
}
