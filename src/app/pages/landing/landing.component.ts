import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CharactersService } from '@domain/api';
import { ICharacter } from '@domain/model/interfaces';
import { IPreviewResult } from '@utils/interfaces';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  constructor(private readonly charactersService: CharactersService) {}

  subs = new SubSink();

  searchForm = new FormGroup({
    toSearch: new FormControl(null, [Validators.required]),
  });

  previewResults: IPreviewResult[] = [];

  ngOnInit(): void {
    this.subs.sink = this.searchForm.valueChanges
      .pipe(debounce(() => interval(500)))
      .subscribe(() => {
        this.previewResults = [];
        if (this.searchForm.valid) {
          this.searchByName();
        }
      });
  }

  searchByName(): void {
    if (this.searchForm.valid) {
      this.previewResults = [];
      this.charactersService
        .getCharacters(this.searchForm.value.toSearch)
        .subscribe((res) => {
          res.data.results.map((el: ICharacter) => {
            const item: IPreviewResult = {
              name: el.name,
              type: 'character',
              itemId: el.id,
            };
            this.previewResults = [...this.previewResults, item];
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
