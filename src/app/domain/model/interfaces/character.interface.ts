import { IUrls } from '@utils/interfaces';

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceUrl: string;
  urls: IUrls[];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: any[];
  stories: any[];
}
