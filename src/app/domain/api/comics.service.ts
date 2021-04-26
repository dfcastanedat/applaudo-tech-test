import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComic } from '@domain/model/interfaces/comic.interface';
import { SearchMethodApiController } from '@utils/enums';
import { buildParams, getApiUrl } from '@utils/functions';
import { IDataContainer, IResponseApiWrapper } from '@utils/interfaces';
import { IComicsParams } from '@utils/interfaces/comics-params.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  constructor(private readonly http: HttpClient) {}

  getComics(
    titleStartsWith?: string,
    format?: string,
    issueNumber?: number,
    orderBy?: string,
    characters?: number,
    stories?: number,
    offset?: number
  ): Observable<IResponseApiWrapper<IDataContainer<IComic>>> {
    const params = buildParams<IComicsParams>({
      titleStartsWith,
      format,
      issueNumber,
      orderBy,
      characters,
      stories,
      offset,
    });
    return this.http.get<IResponseApiWrapper<IDataContainer<IComic>>>(
      getApiUrl(SearchMethodApiController.COMICS),
      {
        params,
      }
    );
  }

  getComicById(
    comicId: number
  ): Observable<IResponseApiWrapper<IDataContainer<IComic>>> {
    return this.http.get<IResponseApiWrapper<IDataContainer<IComic>>>(
      getApiUrl(SearchMethodApiController.COMICS, comicId.toString())
    );
  }
}
