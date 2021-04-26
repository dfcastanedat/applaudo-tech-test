import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly comicsService: ComicsService,
    private readonly charactersService: CharactersService,
    private readonly storiesService: StoriesService
  ) {}

  itemId = this.activatedRoute.snapshot.params.id;

  comic: IComic;
  loading: boolean;

  characters: ICharacter[] = [];
  totalCharactersAviable = 0;
  charactersOffset = 0;
  charactersLoading = false;

  stories: IStorie[] = [];
  totalStoriesAviable = 0;
  storiesOffset = 0;
  storiesLoading = false;

  switchSelector = true;

  getImgUrl = getImgUrl;

  getStories(comicId?: number, offset?: number): void {
    this.storiesLoading = true;
    this.storiesService
      .getStories(comicId, null, null, offset)
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

  getCharacters(comicId?: number, offset?: number): void {
    this.charactersLoading = true;
    this.charactersService
      .getCharacters(null, null, null, comicId, null, offset)
      .subscribe((res) => {
        console.log(res.data.results);
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

  ngOnInit(): void {
    this.loading = true;
    this.comicsService.getComicById(this.itemId).subscribe((res) => {
      this.comic = res.data.results[0];
      this.loading = false;
    });
    this.getStories(this.itemId);
    this.getCharacters(this.itemId);
  }
}
