import { IUrls } from '@utils/interfaces';
import { IComic } from './comic.interface';
import { IStorie } from './storie.interface';

export interface ICharacter {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  modified?: Date;
  resourceUrl?: string;
  urls?: IUrls[];
  thumbnail?: {
    path: string;
    extension: string;
  };
  comics?: IComic[];
  stories?: IStorie[];
}
