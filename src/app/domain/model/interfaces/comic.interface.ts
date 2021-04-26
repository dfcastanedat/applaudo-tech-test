import { ICharacter } from './character.interface';
import { IStorie } from './storie.interface';

export interface IComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  format: string;
  pageCount: number;
  textObjects: [
    {
      type: string;
      languaje: string;
      text: string;
    }
  ];
  thumbnail: {
    path: string;
    extension: string;
  };
  stories: IStorie[];
  characters: ICharacter[];
}
