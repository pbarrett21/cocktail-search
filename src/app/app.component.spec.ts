import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {HttpClient} from '@angular/common/http';
import {HttpTestingController} from '@angular/common/http/testing';
import {CocktailService} from './services/cocktail.service';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [

    ],
    providers: [{provide: HttpClient, useClass: HttpTestingController}],
    shallow: true
  });

  beforeEach(async () => {
    spectator = createComponent();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('function tests', () => {
    it('receiveFilterQuery should call either searchByName or searchByIngredient', () => {
      const searchByNameSpy = spyOn(spectator.component, 'searchByName');
      const searchByIngredientSpy = spyOn(spectator.component, 'searchByIngredient');
      const input = {
        input: 'SomeDrink',
        type: 'Name',
        isCocktail: 'Both',
        isAlcoholic: 'Both'
      };
      spectator.component.receiveFilterQuery(input);
      expect(searchByNameSpy).toHaveBeenCalledWith(input);
      expect(searchByIngredientSpy).not.toHaveBeenCalled();
    });
    it('receiveFilterQuery should call either searchByName or searchByIngredient', () => {
      const searchByNameSpy = spyOn(spectator.component, 'searchByName');
      const searchByIngredientSpy = spyOn(spectator.component, 'searchByIngredient');
      const input = {
        input: 'SomeDrink',
        type: 'Ingredient',
        isCocktail: 'Both',
        isAlcoholic: 'Both'
      };
      spectator.component.receiveFilterQuery(input);
      expect(searchByNameSpy).not.toHaveBeenCalled();
      expect(searchByIngredientSpy).toHaveBeenCalledWith(input);
    });
    it('searchByName should call cocktailService.searchCocktailByName', () => {
      const searchCocktailByNameSpy = spyOn(spectator.inject(CocktailService), 'searchCocktailByName')
        .and
        .returnValue(of('unimportant'));
      const input = {
        input: 'SomeDrink',
        type: 'Ingredient',
        isCocktail: 'Both',
        isAlcoholic: 'Both'
      };
      spectator.component.searchByName(input);
      expect(searchCocktailByNameSpy).toHaveBeenCalledWith(input.input);
    });
    // would add similar tests for other methods
  });

});
