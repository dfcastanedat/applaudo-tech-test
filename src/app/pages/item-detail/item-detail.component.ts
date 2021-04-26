import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
import { DetailTypeController } from '@utils/enums';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly charactersService: CharactersService,
    private readonly comicsService: ComicsService,
    private readonly storiesService: StoriesService
  ) {}

  detailType: string;
  itemId = this.activatedRoute.snapshot.params.id;

  character?: ICharacter;

  comics: IComic[] = [];
  totalComicsAviable = 0;
  comicsOffset = 0;

  stories: IStorie[] = [];
  totalStoriesAviable = 0;
  storiesOffset = 0;

  loading: boolean;

  getImgUrl = getImgUrl;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    switch (this.activatedRoute.snapshot.params.type) {
      case 'character':
        this.loading = true;
        this.charactersService
          .getCharacterById(this.itemId)
          .subscribe((res) => {
            this.character = res.data.results[0];
            this.loading = false;
          });
        this.getComics(this.itemId);
        this.getStories(this.itemId);
        this.detailType = DetailTypeController.CHARACTER;
        break;
      case 'comic':
        console.log('Comic');
        break;
      default:
        console.log('OK...');
        break;
    }
  }

  getComics(characterId?: number, storieId?: number, offset?: number): void {
    this.comicsService
      .getComics(null, null, null, null, characterId, storieId, offset)
      .subscribe((res) => {
        this.totalComicsAviable = res.data.total;
        res.data.results.map((item: IComic) => {
          this.comics.push(item);
        });
        if (this.comicsOffset < this.totalComicsAviable + 20) {
          this.comicsOffset += 20;
        }
      });
  }

  getStories(characterId?: number, comicId?: number, offset?: number): void {
    this.storiesService
      .getStories(comicId, characterId, null, offset)
      .subscribe((res) => {
        this.totalStoriesAviable = res.data.total;
        res.data.results.map((item: IStorie) => {
          this.stories.push(item);
        });
        if (this.storiesOffset < this.totalStoriesAviable + 20) {
          this.storiesOffset += 20;
        }
      });
  }
}
