import { Component, OnInit } from '@angular/core';
import { StoriesService } from '@domain/api';
import { IStorie } from '@domain/model/interfaces';
import {
  CHARACTERS_ROUTE,
  COMICS_ROUTE,
  STORIES_ROUTE,
} from '@utils/constants';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  constructor(private readonly storiesService: StoriesService) {}

  loading = false;

  posibleSelections = [COMICS_ROUTE, CHARACTERS_ROUTE, STORIES_ROUTE];
  actualSelection = '';

  storiesToDisplay: IStorie[] = [];

  offsetVal = 0;

  getImgUrl = getImgUrl;

  onScrollDown(): void {
    this.offsetVal += 20;
    this.getStories();
  }

  getStories(): void {
    this.loading = true;
    this.storiesService
      .getStories(null, null, null, this.offsetVal)
      .subscribe((res) => {
        res.data.results.map((item: IStorie) => {
          this.storiesToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.getStories();
  }
}
