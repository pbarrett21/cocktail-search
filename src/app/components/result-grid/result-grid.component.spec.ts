import {ResultGridComponent} from './result-grid.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {MatGridListModule} from '@angular/material/grid-list';

describe('ResultGridComponent', () => {

  let spectator: Spectator<ResultGridComponent>;

  const createComponent = createComponentFactory({
    component: ResultGridComponent,
    imports: [
      MatGridListModule
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
});
