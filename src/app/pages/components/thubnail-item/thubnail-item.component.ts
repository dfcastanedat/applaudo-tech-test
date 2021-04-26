import { Component, OnInit, Input } from '@angular/core';
import { DETAIL_ROUTE } from '@utils/constants';

@Component({
  selector: 'app-thubnail-item',
  templateUrl: './thubnail-item.component.html',
  styleUrls: ['./thubnail-item.component.scss'],
})
export class ThubnailItemComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() type: string;
  @Input() name: string;
  @Input() itemId: number;
  @Input() bookMark = true;

  constructor() {}

  ngOnInit(): void {}

  getItemLink(): string[] {
    return [`${this.type}`, `${this.itemId}`];
  }
}
