import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
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

  itemId = this.activatedRoute.snapshot.params.id;

  posibleSelections = ['comic', 'character', 'storie'];
  actualSelection = '';

  item: ICharacter | IStorie | IComic;
  loading: boolean;

  comics: IComic[] = [];
  totalComicsAviable = 0;
  comicsOffset = 0;
  comicsLoading = false;

  stories: IStorie[] = [];
  totalStoriesAviable = 0;
  storiesOffset = 0;
  storiesLoading = false;

  characters: ICharacter[] = [];
  totalCharactersAviable = 0;
  charactersOffset = 0;
  charactersLoading = false;

  switchAviableSelections = ['comics', 'stories'];
  switchSelection = '';

  getImgUrl = getImgUrl;

  getCharacters(comicId?: number, storieId?: number, offset?: number): void {
    this.charactersLoading = true;
    this.charactersService
      .getCharacters(null, null, storieId, comicId, null, offset)
      .subscribe((res) => {
        this.totalCharactersAviable = res.data.total;
        res.data.results.map((item: ICharacter) => {
          this.characters.push(item);
        });
        if (this.charactersOffset < this.totalCharactersAviable + 20) {
          this.charactersOffset += 20;
        }
        this.charactersLoading = false;
      });
  }

  getComics(characterId?: number, storieId?: number, offset?: number): void {
    this.comicsLoading = true;
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
        this.comicsLoading = false;
      });
  }

  getStories(characterId?: number, comicId?: number, offset?: number): void {
    this.storiesLoading = true;
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
        this.storiesLoading = false;
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.url.subscribe((val) => {
      this.actualSelection = val[0].path;
    });
    switch (this.actualSelection) {
      case this.posibleSelections[0]:
        this.switchAviableSelections = ['characters', 'stories'];
        this.switchSelection = this.switchAviableSelections[0];
        this.getStories(null, this.itemId);
        this.getCharacters(this.itemId);
        this.comicsService.getComicById(this.itemId).subscribe((res) => {
          this.item = res.data.results[0];
          this.loading = false;
        });
        break;
      case this.posibleSelections[1]:
        this.switchAviableSelections = ['comics', 'stories'];
        this.switchSelection = this.switchAviableSelections[0];
        this.loading = true;
        this.charactersService
          .getCharacterById(this.itemId)
          .subscribe((res) => {
            this.item = res.data.results[0];
            this.item.title = res.data.results[0].name;
            this.loading = false;
          });
        this.getComics(this.itemId);
        this.getStories(this.itemId);
        break;
      case this.posibleSelections[2]:
        this.switchAviableSelections = ['characters', 'comics'];
        this.switchSelection = this.switchAviableSelections[0];
        this.storiesService.getStorieById(this.itemId).subscribe((res) => {
          this.item = res.data.results[0];
          this.loading = false;
        });
        this.getCharacters(this.itemId);
        this.getComics(null, this.itemId);
        break;
      default:
        break;
    }
  }
}
