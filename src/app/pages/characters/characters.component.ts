import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharactersService, ComicsService } from '@domain/api';
import { ICharacter } from '@domain/model/interfaces';
import { IComic } from '@domain/model/interfaces/comic.interface';
import { getImgUrl } from '@utils/functions/get-img-url.function';
import { IPreviewResult } from '@utils/interfaces';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit, OnDestroy {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly comicsService: ComicsService
  ) {}

  subs = new SubSink();

  firstLoad = false;
  loading = false;

  filtersForm = new FormGroup({
    nameStartsWith: new FormControl(null),
    stories: new FormControl(null),
    comics: new FormControl(null),
    orderBy: new FormControl(null),
    comicId: new FormControl(null),
    storieId: new FormControl(null),
    orderByMethod: new FormControl(null),
  });

  previewNames: IPreviewResult[] = [];
  previewComics: IPreviewResult[] = [];
  stories: IPreviewResult[] = [];
  orderByVariables: IPreviewResult[] = [];

  charactersToDisplay: ICharacter[] = [];

  totalCharactersAviable = 0;
  offsetVal = 0;

  getImgUrl = getImgUrl;

  updateComicFilter(item: IPreviewResult): void {
    this.filtersForm.patchValue({
      ...this.filtersForm,
      comics: item.name,
      comicId: item.itemId,
    });
  }

  updateOrderByFilter(item: IPreviewResult): void {
    this.orderByVariables = [];
    this.filtersForm.patchValue({
      ...this.filtersForm,
      orderBy: item.name,
      orderByMethod: item.toDisplay,
    });
  }

  touchedOrderBy(): void {
    this.orderByVariables = [
      { toDisplay: 'name', name: 'Order A-Z', type: 'filter' },
      { toDisplay: '-name', name: 'Order Z-A', type: 'filter' },
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
        this.totalCharactersAviable = res.data.total;
        res.data.results.map((item: ICharacter) => {
          this.charactersToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  onScrollDown(): void {
    if (this.offsetVal < this.totalCharactersAviable + 20) {
      this.offsetVal += 20;
      this.getCharacters(
        null,
        this.filtersForm.value.nameStartsWith,
        this.filtersForm.value.storieId,
        this.filtersForm.value.comicId,
        this.filtersForm.value.orderByMethod,
        this.offsetVal
      );
    } else {
      console.warn('Max reached');
    }
  }

  ngOnInit(): void {
    this.getCharacters();
    this.subs.sink = this.filtersForm.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe((value) => {
        if (value.comicId || value.nameStartsWith || value.orderByMethod) {
          this.charactersToDisplay = [];
          this.getCharacters(
            value.nameStartsWith,
            null,
            null,
            value.comicId,
            value.orderByMethod
          );
        } else if (this.firstLoad && value.comics.length === 0) {
          this.charactersToDisplay = [];
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
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
