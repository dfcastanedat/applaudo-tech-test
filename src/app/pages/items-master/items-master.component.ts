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
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

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

  filtersForm: FormGroup;

  itemsToDisplay: ICharacter[] | IComic[] | IStorie[] = [];

  totalItemsAviable = 0;
  offsetVal = 0;

  previewNames: IPreviewResult[] = [];
  previewComics: IPreviewResult[] = [];
  stories: IPreviewResult[] = [];
  orderByVariables: IPreviewResult[] = [];
  formatsAviable: IPreviewResult[] = [];

  getImgUrl = getImgUrl;

  touchedOrderBy(): void {
    switch (this.actualSelection) {
      case this.posibleSelections[0]:
        this.orderByVariables = [
          { toDisplay: 'issueNumber', name: 'Order ascendent', type: 'filter' },
          {
            toDisplay: '-issueNumber',
            name: 'Order descendent',
            type: 'filter',
          },
        ];
        break;
      case this.posibleSelections[1]:
        this.orderByVariables = [
          { toDisplay: 'name', name: 'Order A-Z', type: 'filter' },
          { toDisplay: '-name', name: 'Order Z-A', type: 'filter' },
        ];
        break;
      default:
        break;
    }
  }

  touchedFormat(): void {
    this.formatsAviable = [
      { toDisplay: 'comic', name: 'Comic', type: 'filter' },
      { toDisplay: 'magazine', name: 'Magazine', type: 'filter' },
      { toDisplay: 'trade paperback', name: 'Trade Paperback', type: 'filter' },
      { toDisplay: 'hardcover', name: 'Hardcover', type: 'filter' },
      { toDisplay: 'digest', name: 'Digest', type: 'filter' },
      { toDisplay: 'graphic novel', name: 'Graphic Novel', type: 'filter' },
      { toDisplay: 'digital comic', name: 'Digital Comic', type: 'filter' },
      { toDisplay: 'infinite comic', name: 'Infinite Comic', type: 'filter' },
    ];
  }

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

  getItemType(): string {
    switch (this.actualSelection) {
      case this.posibleSelections[0]:
        return 'comic';
      case this.posibleSelections[1]:
        return 'character';
      case this.posibleSelections[2]:
        return 'storie';
      default:
        break;
    }
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

  getStories(offset?: number): void {
    this.loading = true;
    this.storiesService
      .getStories(null, null, null, offset)
      .subscribe((res) => {
        this.totalItemsAviable = res.data.total;
        res.data.results.map((item: IStorie) => {
          this.itemsToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  onScrollDown(): void {
    this.offsetVal += 20;
    if (this.offsetVal < this.totalItemsAviable + 20) {
      console.log(this.actualSelection);
      switch (this.actualSelection) {
        case this.posibleSelections[0]:
          this.getComics(null, null, null, null, this.offsetVal);
          break;
        case this.posibleSelections[1]:
          this.getCharacters(null, null, null, null, null, this.offsetVal);
          break;
        case this.posibleSelections[2]:
          this.getStories(this.offsetVal);
          break;
        default:
          break;
      }
    }
  }

  updateOrderByFilter(item: IPreviewResult): void {
    this.orderByVariables = [];
    this.filtersForm.patchValue({
      ...this.filtersForm,
      orderBy: item.name,
      orderByMethod: item.toDisplay,
    });
  }

  updateFilterByFormat(item: IPreviewResult): void {
    this.formatsAviable = [];
    this.filtersForm.patchValue({
      ...this.filtersForm,
      format: item.name,
      filterByFormatMethod: item.toDisplay,
    });
  }

  updateComicFilter(item: IPreviewResult): void {
    this.filtersForm.patchValue({
      ...this.filtersForm,
      comics: item.name,
      comicId: item.itemId,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((val) => {
      this.actualSelection = val[0].path;
    });
    switch (this.actualSelection) {
      case this.posibleSelections[0]:
        this.filtersForm = new FormGroup({
          titleStartsWith: new FormControl(null),
          orderBy: new FormControl(null),
          issueNumber: new FormControl(null),
          format: new FormControl(null),
          filterByFormatMethod: new FormControl(null),
          orderByMethod: new FormControl(null),
        });
        this.getComics();
        this.subs.sink = this.filtersForm.valueChanges
          .pipe(debounce(() => interval(500)))
          .subscribe((value) => {
            console.log(value);
            if (
              value.titleStartsWith ||
              value.issueNumber ||
              value.filterByFormatMethod ||
              value.orderByMethod
            ) {
              this.itemsToDisplay = [];
              this.getComics(
                value.titleStartsWith,
                value.filterByFormatMethod,
                value.issueNumber,
                value.orderByMethod
              );
            } else if (this.firstLoad) {
              this.itemsToDisplay = [];
              this.getComics();
            }
          });
        break;
      case this.posibleSelections[1]:
        this.filtersForm = new FormGroup({
          nameStartsWith: new FormControl(null),
          stories: new FormControl(null),
          comics: new FormControl(null),
          orderBy: new FormControl(null),
          comicId: new FormControl(null),
          storieId: new FormControl(null),
          orderByMethod: new FormControl(null),
        });
        this.getCharacters();
        this.subs.sink = this.filtersForm.valueChanges
          .pipe(debounce(() => interval(500)))
          .subscribe((value) => {
            if (value.comicId || value.nameStartsWith || value.orderByMethod) {
              this.itemsToDisplay = [];
              this.getCharacters(
                value.nameStartsWith,
                null,
                null,
                value.comicId,
                value.orderByMethod
              );
            } else if (
              this.firstLoad &&
              value.comics &&
              value.comics.length === 0 &&
              value.nameStartsWith.length === 0
            ) {
              this.itemsToDisplay = [];
              this.getCharacters();
            }
          });
        this.subs.sink = this.filtersForm.controls.comics.valueChanges
          .pipe(debounce(() => interval(500)))
          .subscribe((value) => {
            this.previewComics = [];
            if (value && value.length > 0) {
              this.comicsService.getComics(value).subscribe((res) => {
                res.data.results.map((el: IComic) => {
                  const item: IPreviewResult = {
                    name: el.title,
                    itemId: el.id,
                    type: 'filter',
                  };
                  this.previewComics.push(item);
                });
              });
            } else {
              this.filtersForm.patchValue(
                {
                  ...this.filtersForm,
                  comics: null,
                  comicId: null,
                },
                { emitEvent: false }
              );
            }
          });
        break;
      case this.posibleSelections[2]:
        this.getStories();
        break;
      default:
        break;
    }
    console.log(this.actualSelection);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
