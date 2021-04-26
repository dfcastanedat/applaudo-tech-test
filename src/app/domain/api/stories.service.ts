import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStorie } from '@domain/model/interfaces';
import { SearchMethodApiController } from '@utils/enums';
import { buildParams, getApiUrl } from '@utils/functions';
import { IDataContainer, IResponseApiWrapper } from '@utils/interfaces';
import { IStoriesParams } from '@utils/interfaces/stories-params.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  constructor(private readonly http: HttpClient) {}

  getStories(
    comics?: number,
    characters?: number,
    orderBy?: string,
    offset?: number
  ): Observable<IResponseApiWrapper<IDataContainer<IStorie>>> {
    const params = buildParams<IStoriesParams>({
      comics,
      characters,
      orderBy,
      offset,
    });
    return this.http.get<IResponseApiWrapper<IDataContainer<IStorie>>>(
      getApiUrl(SearchMethodApiController.STORIES),
      {
        params,
      }
    );
  }

  getStorieById(
    storieId: number
  ): Observable<IResponseApiWrapper<IDataContainer<IStorie>>> {
    return this.http.get<IResponseApiWrapper<IDataContainer<IStorie>>>(
      getApiUrl(SearchMethodApiController.STORIES, storieId.toString())
    );
  }
}
