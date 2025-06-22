import { Component, OnInit, ViewChild } from '@angular/core';

import { GoogleChartComponent } from 'angular-google-charts';

import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-e-admin-management',
  templateUrl: './e-admin-management.component.html',
  styleUrl: './e-admin-management.component.scss',
})
export class EAdminManagementComponent implements OnInit {
  teams = [
    {
      name: 'КСТ3',
      wins: [
        { gameName: 'Програмиране', tournamentDate: '2023-06-01', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Програмиране', tournamentDate: '2023-05-12', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Математика', tournamentDate: '2024-02-22', tournamentCreator: 'tu_varna_programming' },
      ],
    },
    {
      name: 'СИТ',
      wins: [
        { gameName: 'Програмиране', tournamentDate: '2023-08-10', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Тенис на маса', tournamentDate: '2023-07-15', tournamentCreator: 'tu_varna_sports' },
      ],
    },
    {
      name: 'КСТ',
      wins: [
        { gameName: 'Програмиране', tournamentDate: '2022-11-01', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Програмиране', tournamentDate: '2023-01-20', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Програмиране', tournamentDate: '2024-03-10', tournamentCreator: 'tu_varna_programming' },
      ],
    },
    {
      name: 'СИТЗ',
      wins: [
        { gameName: 'Програмиране', tournamentDate: '2023-10-30', tournamentCreator: 'tu_varna_programming' },
        { gameName: 'Математика', tournamentDate: '2023-10-30', tournamentCreator: 'tu_varna_programming' },
      ],
    },
    // {
    //   name: 'Team E',
    //   wins: [
    //     { gameName: 'CS:GO', tournamentDate: '2024-04-05', tournamentCreator: 'ESL' },
    //     { gameName: 'Dota 2', tournamentDate: '2023-03-18', tournamentCreator: 'Valve' },
    //   ],
    // },
  ];

  selectedGame: string = '';
  selectedCreator: string = '';

  uniqueGames: string[] = [];
  uniqueCreators: string[] = [];

  chartData: any[] = [];
  chartType = 'ColumnChart' as any;
  chartColumns = ['Team', 'Wins'];
  chartOptions = {
    title: 'Tournament Wins by Team',
    hAxis: { title: 'Teams' },
    vAxis: { title: 'Number of Wins' },
    colors: ['#3366CC'],
    animation: {
      startup: true,
      duration: 800,
      easing: 'out',
    },
  };
  chartWidth = 650;
  chartHeight = 300;

  // Pie chart
  pieChartData: any[] = [];
  pieChartType = 'PieChart' as any;
  pieChartColumns = ['Team', 'Total Wins'];
  pieChartOptions = {
    title: 'Wins Distribution (Filtered)',
    pieHole: 0.4,
    colors: ['#1E88E5', '#43A047', '#F4511E', '#FB8C00', '#6D4C41', '#8E24AA'],
    animation: {
      startup: true,
      duration: 900,
      easing: 'out',
    },
  };
  pieChartWidth = 500;
  pieChartHeight = 300;
  constructor(private brandingService: BrandingService) {}

  ngOnInit() {
    this.brandingService.theme$.subscribe((t) => {
      this.chartOptions.colors = [t.primaryColor];
      this.pieChartOptions.colors = [t.primaryColor, t.secondaryColor, t.textColor, '#7a99d3'];
    });

    this.buildFilterOptions();
    this.updateCharts();
  }
  buildFilterOptions(): void {
    const games = new Set<string>();
    const creators = new Set<string>();

    this.teams.forEach((team) => {
      team.wins.forEach((win) => {
        games.add(win.gameName);
        creators.add(win.tournamentCreator);
      });
    });

    this.uniqueGames = Array.from(games);
    this.uniqueCreators = Array.from(creators);
  }

  updateCharts(): void {
    this.updateChartData();
    this.updatePieChartData();
  }

  updateChartData(): void {
    this.chartData = this.teams.map((team) => {
      const filteredWins = team.wins.filter(
        (win) =>
          (this.selectedGame ? win.gameName === this.selectedGame : true) &&
          (this.selectedCreator ? win.tournamentCreator === this.selectedCreator : true)
      );
      return [team.name, filteredWins.length];
    });
  }

  updatePieChartData(): void {
    this.pieChartData = this.teams
      .map((team) => {
        const filteredWins = team.wins.filter(
          (win) =>
            (this.selectedGame ? win.gameName === this.selectedGame : true) &&
            (this.selectedCreator ? win.tournamentCreator === this.selectedCreator : true)
        );
        return [team.name, filteredWins.length];
      })
      .filter((entry) => +entry[1] > 0); // Only include teams with matching wins
  }

  onFilterChange(): void {
    this.updateCharts();
  }
}
