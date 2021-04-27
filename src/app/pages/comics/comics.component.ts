import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComicsService } from '@domain/api';
import { IComic } from '@domain/model/interfaces';
import { getImgUrl } from '@utils/functions/get-img-url.function';
import { IPreviewResult } from '@utils/interfaces';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit, OnDestroy {
  constructor(private readonly comicsService: ComicsService) {}

  subs = new SubSink();

  firstLoad = false;
  loading = false;

  filtersForm = new FormGroup({
    titleStartsWith: new FormControl(null),
    orderBy: new FormControl(null),
    issueNumber: new FormControl(null),
    format: new FormControl(null),
    filterByFormatMethod: new FormControl(null),
    orderByMethod: new FormControl(null),
  });

  formatsAviable: IPreviewResult[] = [];
  orderByVariables: IPreviewResult[] = [];

  comicssToDisplay: IComic[] = [];

  totalComicsAviable = 0;
  offsetVal = 0;

  getImgUrl = getImgUrl;

  touchedOrderBy(): void {
    this.orderByVariables = [
      { toDisplay: 'issueNumber', name: 'Order ascendent', type: 'filter' },
      { toDisplay: '-issueNumber', name: 'Order descendent', type: 'filter' },
    ];
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
        this.totalComicsAviable = res.data.total;
        res.data.results.map((item: IComic) => {
          this.comicssToDisplay.push(item);
        });
        this.loading = false;
      });
  }

  onScrollDown(): void {
    if (this.offsetVal < this.totalComicsAviable + 20) {
      this.offsetVal += 20;
      this.getComics(
        this.filtersForm.value.titleStartsWith,
        this.filtersForm.value.filterByFormatMethod,
        this.filtersForm.value.issueNumber,
        this.filtersForm.value.orderByMethod,
        this.offsetVal
      );
    } else {
      console.warn('Max reached');
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

  ngOnInit(): void {
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
          this.comicssToDisplay = [];
          this.getComics(
            value.titleStartsWith,
            value.filterByFormatMethod,
            value.issueNumber,
            value.orderByMethod
          );
        } else if (this.firstLoad) {
          this.comicssToDisplay = [];
          this.getComics();
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
