import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-item-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly charactersService: CharactersService,
    private readonly comicsService: ComicsService,
    private readonly storiesService: StoriesService
  ) {}

  itemId = this.activatedRoute.snapshot.params.id;

  character: ICharacter;
  loading: boolean;

  comics: IComic[] = [];
  totalComicsAviable = 0;
  comicsOffset = 0;
  comicsLoading = false;

  stories: IStorie[] = [];
  totalStoriesAviable = 0;
  storiesOffset = 0;
  storiesLoading = false;

  switchSelector = true;

  getImgUrl = getImgUrl;

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
    this.charactersService.getCharacterById(this.itemId).subscribe((res) => {
      this.character = res.data.results[0];
      this.loading = false;
    });
    this.getComics(this.itemId);
    this.getStories(this.itemId);
  }
}
