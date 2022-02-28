import {DrinkTileComponent} from './drink-tile.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {MatCardModule} from '@angular/material/card';

describe('DrinkTileComponent', () => {
  let spectator: Spectator<DrinkTileComponent>;

  const createComponent = createComponentFactory({
    component: DrinkTileComponent,
    imports: [
      MatCardModule
    ],
    providers: [],
    shallow: true
  });

  beforeEach(async () => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // could add further testing surrounding changes to DOM from different inputs / conditions

});
