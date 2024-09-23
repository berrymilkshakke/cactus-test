import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-bonus-item-string-value',
  templateUrl: './bonus-item-string-value.component.html',
  styleUrls: ['./bonus-item-string-value.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BonusItemStringValueComponent implements OnInit {

  @Input() public title: string;
  @Input() public value: any;
  @Input() public style: string;

  @Input() public stringLength: number;

  constructor() {
  }

  ngOnInit() {

  }

}
