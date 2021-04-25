import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '@domain/api';
import { ICharacter } from '@domain/model/interfaces';
import { DetailTypeController } from '@utils/enums';
import { getImgUrl } from '@utils/functions/get-img-url.function';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly charactersService: CharactersService
  ) {}

  detailType: string;

  character?: ICharacter;

  loading: boolean;

  getImgUrl = getImgUrl;

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    switch (this.activatedRoute.snapshot.params.type) {
      case 'character':
        this.loading = true;
        this.charactersService
          .getCharacterById(this.activatedRoute.snapshot.params.id)
          .subscribe((res) => {
            console.log(res.data.results[0]);
            this.character = res.data.results[0];
            this.loading = false;
          });
        this.detailType = DetailTypeController.CHARACTER;
        break;

      default:
        console.log('OK...');
        break;
    }
  }
}
