import { IThumbnailItem } from './thumbnail-item.interface';

export interface IAppState {
  characters: IThumbnailItem[];
  comics: IThumbnailItem[];
  stories: IThumbnailItem[];
}
