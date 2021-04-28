import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {
  CHARACTERS_ROUTE,
  COMICS_ROUTE,
  STORIES_ROUTE,
} from '@utils/constants';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { SubSink } from 'subsink';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
import { IPreviewResult } from '@utils/interfaces';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-items-master',
  templateUrl: './items-master.component.html',
  styleUrls: ['./items-master.component.scss'],
})
export class ItemsMasterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly comicsService: ComicsService,
    private readonly storiesService: StoriesService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  subs = new SubSink();

  posibleSelections = [COMICS_ROUTE, CHARACTERS_ROUTE, STORIES_ROUTE];
  actualSelection = '';

  firstLoad = false;
  loading = false;

  itemsToDisplay: ICharacter[] | IComic[] | IStorie[] = [];

  totalItemsAviable = 0;
  offsetVal = 0;

  previewNames: IPreviewResult[] = [];
  previewComics: IPreviewResult[] = [];
  stories: IPreviewResult[] = [];
  orderByVariables: IPreviewResult[] = [];
  formatsAviable: IPreviewResult[] = [];

  getImgUrl = getImgUrl;

  getCharacters(
    nameStartsWith?: string,
    name?: string,
    stories?: number,
    comics?: number,
    orderBy?: string,
    offset?: number
  ): void {
    this.firstLoad = true;
    this.loading = true;
    this.charactersService
      .getCharacters(nameStartsWith, name, stories, comics, orderBy, offset)
      .subscribe((res) => {
        this.totalItemsAviable = res.data.total;
        res.data.results.map((item: ICharacter) => {
          this.itemsToDisplay.push({ ...item, title: item.name });
        });
        this.loading = false;
      });
  }

  getComics(
    titleStartsWith?: string,
    format?: string,
    issueNumber?: number,
    orderBy?: string,
    offset?: number
  ): void {
    this.firstLoad = true;
    this.loading = true;
    this.comicsService
      .getComics(
        titleStartsWith,
        format,
        issueNumber,
        orderBy,
        null,
        null,
        offset
      )
      .subscribe((res) => {
        this.totalItemsAviable = res.data.total;
        res.data.results.map((item: IComic) => {
          this.itemsToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  getStories(): void {
    this.loading = true;
    this.storiesService
      .getStories(null, null, null, this.offsetVal)
      .subscribe((res) => {
        res.data.results.map((item: IStorie) => {
          this.itemsToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  onScrollDown(): void {
    this.offsetVal += 20;
    this.getStories();
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((val) => {
      this.actualSelection = val[0].path;
    });
    this.getStories();
    console.log(this.actualSelection);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
