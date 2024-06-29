import { Component } from '@angular/core';

import Team from 'models/team.model';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent {
  teamsData: Team[] = [
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl: 'https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg',
      playersCount: 5,
      tournamentsWon: 3,
    },
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl: 'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1719619200&semt=ais_user',
      playersCount: 5,
      tournamentsWon: 3,
    },
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl: 'https://media.wired.com/photos/65382632fd3d190c7a1f5c68/16:9/w_2400,h_1350,c_limit/Google-Image-Search-news-Gear-GettyImages-824179306.jpg',
      playersCount: 5,
      tournamentsWon: 3,
    },
  ];
}
