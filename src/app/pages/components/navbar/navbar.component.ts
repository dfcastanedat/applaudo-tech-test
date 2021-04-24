import { Component } from '@angular/core';
import {
  BASE_ROUTE,
  CHARACTERS_ROUTE,
  COMICS_ROUTE,
  STORIES_ROUTE,
} from '@utils/constants';
import { INavbarItem } from '@utils/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  navbarItems: INavbarItem[] = [
    {
      name: 'CHARACTERS',
      url: CHARACTERS_ROUTE,
    },
    {
      name: 'COMICS',
      url: COMICS_ROUTE,
    },
    {
      name: 'STORIES',
      url: STORIES_ROUTE,
    },
  ];

  homeUrl: string = BASE_ROUTE;
}
