import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, ComicsService, StoriesService } from '@domain/api';
import { ICharacter, IComic, IStorie } from '@domain/model/interfaces';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-storie-detail',
  templateUrl: './storie-detail.component.html',
  styleUrls: ['./storie-detail.component.scss'],
})
export class StorieDetailComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly storiesService: StoriesService,
    private readonly comicsService: ComicsService,
    private readonly charactersService: CharactersService
  ) {}

  itemId = this.activatedRoute.snapshot.params.id;

  storie: IStorie;
  loading: boolean;

  characters: ICharacter[] = [];
  totalCharactersAviable = 0;
  charactersOffset = 0;
  charactersLoading = false;

  comics: IComic[] = [];
  totalComicsAviable = 0;
  comicsOffset = 0;
  comicsLoading = false;

  switchSelector = true;

  getImgUrl = getImgUrl;

  getCharacters(storieId?: number, offset?: number): void {
    this.charactersLoading = true;
    this.charactersService
      .getCharacters(null, null, storieId, null, null, offset)
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

  getComics(storieId?: number, offset?: number): void {
    this.comicsLoading = true;
    this.comicsService
      .getComics(null, null, null, null, null, storieId, offset)
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

  ngOnInit(): void {
    this.loading = true;
    this.storiesService.getStorieById(this.itemId).subscribe((res) => {
      this.storie = res.data.results[0];
      this.loading = false;
    });
    this.getCharacters(this.itemId);
    this.getComics(this.itemId);
  }
}
