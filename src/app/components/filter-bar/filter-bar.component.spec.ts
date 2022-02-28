import {FilterBarComponent} from './filter-bar.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

describe('FilterBarComponent', () => {
  let spectator: Spectator<FilterBarComponent>;

  const createComponent = createComponentFactory({
    component: FilterBarComponent,
    imports: [
      ReactiveFormsModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule
    ],
    providers: [],
    shallow: true
  });

  beforeEach(async () => {
    spectator = createComponent();
    spectator.component.filterForm.controls['searchInput'].setValue('DrinkName');
    spectator.component.filterForm.controls['filterType'].setValue('Name');
    spectator.component.filterForm.controls['ordinaryOrCocktail'].setValue('Cocktail');
    spectator.component.filterForm.controls['nonAlcOrAlc'].setValue('Both');
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('submitFilterQuery should emit output from form values', () => {
    const emitSpy = spyOn(spectator.component.filterQuery, 'emit');
    spectator.component.submitFilterQuery();
    expect(emitSpy).toHaveBeenCalledWith({
      input: 'DrinkName',
      type: 'Name',
      isCocktail: 'Cocktail',
      isAlcoholic: 'Both'
    })
  });

  it('should not allow submit button to be clicked with invalid form', () => {
    const submitButton = spectator.element.querySelector('#submit-button');
    spectator.component.filterForm.controls['nonAlcOrAlc'].setValue(null); // incomplete form
    spectator.detectChanges();
    expect(submitButton).toBeDisabled();
    spectator.component.filterForm.controls['nonAlcOrAlc'].setValue('Both'); // complete form
    spectator.detectChanges();
    expect(submitButton).not.toBeDisabled(); });

  // could add further testing surrounding changes to DOM from different inputs / conditions

});
