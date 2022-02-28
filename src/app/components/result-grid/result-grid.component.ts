import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../models/drink';

@Component({
  selector: 'app-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss']
})
export class ResultGridComponent implements OnInit {

  @Input() drinks: Drink[] = [] as Drink[];

  constructor() { }

  ngOnInit(): void {
  }

}
