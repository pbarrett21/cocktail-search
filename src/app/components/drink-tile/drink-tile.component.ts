import {Component, Input, OnInit} from '@angular/core';
import {Drink} from '../../models/drink';

@Component({
  selector: 'app-drink-tile',
  templateUrl: './drink-tile.component.html',
  styleUrls: ['./drink-tile.component.scss']
})
export class DrinkTileComponent implements OnInit {

  @Input() drink: Drink = {} as Drink;

  constructor() { }

  ngOnInit(): void {
  }

}
