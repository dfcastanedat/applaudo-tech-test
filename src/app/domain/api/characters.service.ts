import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildParams, getApiUrl } from '@utils/functions';
import { SearchMethodApiController } from '@utils/enums';
import { IDataContainer, IResponseApiWrapper } from '@utils/interfaces';
import { Observable } from 'rxjs';
import { ICharacter } from '@domain/model/interfaces';
import { ICharactersParams } from '@utils/interfaces/characters-params.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private readonly http: HttpClient) {}

  getCharacters(
    name?: string,
    storiesId?: number,
    comicId?: number,
    orderBy?: boolean
  ): Observable<IResponseApiWrapper<IDataContainer<ICharacter>>> {
    const params = buildParams({ name, storiesId, comicId, orderBy });
    return this.http.get<IResponseApiWrapper<IDataContainer<ICharacter>>>(
      getApiUrl(SearchMethodApiController.CHARACTERS),
      {
        params: {
          nameStartsWith: params.name,
        },
      }
    );
  }

  getCharacterById(
    characterId: number
  ): Observable<IResponseApiWrapper<IDataContainer<ICharacter>>> {
    return this.http.get<IResponseApiWrapper<IDataContainer<ICharacter>>>(
      getApiUrl(SearchMethodApiController.CHARACTERS, characterId.toString())
    );
  }
}
