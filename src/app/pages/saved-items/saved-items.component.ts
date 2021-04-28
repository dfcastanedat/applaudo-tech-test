import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@utils/interfaces/app-state.interface';
import { IThumbnailItem } from '@utils/interfaces/thumbnail-item.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx/app.state';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss'],
})
export class SavedItemsComponent implements OnInit, OnDestroy {
  savedItems: Observable<IAppState>;

  subs = new SubSink();

  posibleSelections = ['comics', 'characters', 'stories'];

  actualSelection = this.posibleSelections[0];

  savedComics: IThumbnailItem[] = [];
  savedCharacters: IThumbnailItem[] = [];
  savedStories: IThumbnailItem[] = [];

  constructor(private readonly store: Store<AppState>) {
    this.savedItems = store.select('appState');
  }

  ngOnInit(): void {
    this.subs.sink = this.savedItems.subscribe((val) => {
      this.savedComics = val.comics;
      this.savedCharacters = val.characters;
      this.savedStories = val.stories;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
