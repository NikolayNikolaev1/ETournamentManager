import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogRef, DialogService } from '@ngneat/dialog';

import { TEAM_MANAGEMENT_FORM_MODEL } from 'app/components/dialogs/team-management/team-management.configuration';
import Team, { TeamBase } from 'app/models/team.model';
import { ApiService } from 'app/services/api.service';
import { CLIENT_ROUTES, SERVER_ROUTES } from 'app/utils/constants';

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
    private dialogService: DialogService,
    private ref: DialogRef<{
      teamId: string;
      name: string;
      tag: string;
      description: string;
      onEdit: (data: TeamBase) => void;
    }>
  ) {}

  ngOnInit() {
    if (this.ref.data) {
      this.teamId = this.ref.data.teamId;
      this.isEdit = true;
      this.name = this.ref.data.name;
      this.tag = this.ref.data.tag;
      this.description = this.ref.data.description;
    }
  }

  onFormChanged({ name, tag, description }: TEAM_MANAGEMENT_FORM_MODEL) {
    this.name = name;
    this.tag = tag;
    this.description = description;
  }

  onSubmitClick() {
    this.apiService
      .request<TeamBase, TEAM_MANAGEMENT_FORM_MODEL>({
        url: this.isEdit ? `${SERVER_ROUTES.TEAM.UPDATE}/${this.teamId}` : SERVER_ROUTES.TEAM.CREATE,
        method: this.isEdit ? 'patch' : 'post',
        body: {
          name: this.name,
          tag: this.tag,
          description: this.description,
        },
      })
      .subscribe({
        next: (response) => {
          if (this.isEdit) {
            this.ref.data.onEdit(response);
          } else {
            this.router.navigate([CLIENT_ROUTES.TEAM_DETAILS(), response.id]);
          }

          this.dialogService.closeAll();
        },
        error: (error) => (this.errorMessage = error),
      });
  }
}
