import { ICharacter } from './character.interface';
import { IComic } from './comic.interface';

export interface IStorie {
  id: number;
  title?: string;
  description?: string;
  type?: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  comics?: IComic[];
  characters?: ICharacter[];
}
