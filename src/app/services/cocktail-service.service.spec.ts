import {CocktailService} from './cocktail.service';
import {createServiceFactory, SpectatorService} from '@ngneat/spectator';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Drink} from '../models/drink';
import {HttpTestingController} from '@angular/common/http/testing';

describe('CocktailServiceService', () => {
  let spectator: SpectatorService<CocktailService>;
  let httpClient: HttpClient;

  const createService = createServiceFactory({
    service: CocktailService,
    providers: [{provide: HttpClient, useValue: {get: () => {}}}] // mocking get request since that's all I use
  });

  beforeEach(() => {
    spectator = createService();
    httpClient = spectator.inject(HttpClient);
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  // only testing one for the sake of time
  it('searchCocktailByName should call the correct url', () => {
    const getSpy = spyOn(httpClient, 'get').and.returnValue(of(true));

    spectator.service.searchCocktailByName('DrinkName').subscribe(res => {
      expect(res).toBeTruthy();
    });

    expect(getSpy).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DrinkName');
  });

});
