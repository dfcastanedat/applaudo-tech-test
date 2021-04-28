import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/app.state';
import { IAppState } from '@utils/interfaces/app-state.interface';
import { SubSink } from 'subsink';
import * as appActions from 'src/app/ngrx/actions/app.actions';

@Component({
  selector: 'app-thubnail-item',
  templateUrl: './thubnail-item.component.html',
  styleUrls: ['./thubnail-item.component.scss'],
})
export class ThubnailItemComponent implements OnInit, OnDestroy {
  @Input() imgUrl: string;
  @Input() type: string;
  @Input() name: string;
  @Input() itemId: number;
  @Input() bookMark = true;

  @Input() deleteAction = false;
  @Input() deleteIndex = null;

  savedItems: Observable<IAppState>;

  subs = new SubSink();

  constructor(private readonly store: Store<AppState>) {
    this.savedItems = store.select('appState');
  }

  getItemLink(): string[] {
    return [`${this.type}`, `${this.itemId}`];
  }

  saveItem(): void {
    const thumbnailItem = {
      type: this.type,
      itemId: this.itemId,
      name: this.name,
      imgUrl: this.imgUrl,
    };
    switch (this.type) {
      case 'character':
        this.store.dispatch(new appActions.AddCharacterState(thumbnailItem));
        break;
      case 'comic':
        this.store.dispatch(new appActions.AddComicState(thumbnailItem));
        break;
      case 'storie':
        this.store.dispatch(new appActions.AddStorieState(thumbnailItem));
        break;
      default:
        break;
    }
  }

  deleteItem(): void {
    if (this.deleteIndex) {
      switch (this.type) {
        case 'character':
          this.store.dispatch(
            new appActions.RemoveCharacterState(this.deleteIndex)
          );
          break;
        case 'comic':
          console.log('DELETING COMIC');
          this.store.dispatch(
            new appActions.RemoveComicState(this.deleteIndex)
          );
          break;
        case 'storie':
          this.store.dispatch(
            new appActions.RemoveStorieState(this.deleteIndex)
          );
          break;
        default:
          break;
      }
    }
  }

  ngOnInit(): void {
    this.subs.sink = this.savedItems.subscribe((val) => {
      switch (this.type) {
        case 'character':
          this.bookMark = val.characters.some(
            (el) => el.itemId === this.itemId
          );
          break;
        case 'comic':
          this.bookMark = val.comics.some((el) => el.itemId === this.itemId);
          break;
        case 'storie':
          this.bookMark = val.stories.some((el) => el.itemId === this.itemId);
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
