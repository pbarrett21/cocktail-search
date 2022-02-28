import {Component} from '@angular/core';
import {CocktailService} from './services/cocktail.service';
import {Drink} from './models/drink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  drinks: Drink[] = [] as Drink[];
  drinkFetched: boolean = false;

  constructor(private cocktailService: CocktailService) {
  }

  receiveFilterQuery($event: {
                       input: string,
                       type: string,
                       isCocktail: string,
                       isAlcoholic: string
                     }
  ) {
    switch ($event.type) {
      case 'Name':
        this.searchByName($event);
        break;
      case 'Ingredient':
        this.searchByIngredient($event);
        break;
      default:
        break;
    }
  }

  searchByName(query: { input: string, type: string, isCocktail: string, isAlcoholic: string }) {
    this.cocktailService.searchCocktailByName(query.input).subscribe((res: { drinks: Drink[] }) => {
      this.refineResults(res, query.isAlcoholic, query.isCocktail);
    })
  }

  searchByIngredient(query: { input: string, type: string, isCocktail: string, isAlcoholic: string }) {
    this.cocktailService.searchCocktailByIngredient(query.input).subscribe((res: { drinks: Drink[] }) => {
      this.refineResults(res, query.isAlcoholic, query.isCocktail);
    })
  }

  refineResults(drinks: { drinks: Drink[] }, isAlc: string, isOrdinary: string) {
    if (drinks === null) {
      this.drinks = [];
      this.drinkFetched = true;
      return;
    }
    const currentDrinks = drinks.drinks;
    if (isAlc === 'Both' && isOrdinary === 'Both') {
      this.drinks = currentDrinks;
      this.drinkFetched = true;
      return;
    }
    if (isAlc === 'Alcoholic') {
      this.cocktailService.filterCocktailByAlcoholic().subscribe((res: { drinks: Drink[] }) => {
        this.refilter(currentDrinks, res.drinks);
      });
    }
    if (isAlc === 'Non-alcoholic') {
      this.cocktailService.filterCocktailByNonAlcoholic().subscribe((res: { drinks: Drink[] }) => {
        this.refilter(currentDrinks, res.drinks);
      });
    }
    if (isOrdinary === 'Ordinary') {
      this.cocktailService.filterCocktailByCategoryOrdinary().subscribe((res: { drinks: Drink[] }) => {
        this.refilter(currentDrinks, res.drinks);
      });
    }
    if (isOrdinary === 'Cocktail') {
      this.cocktailService.filterCocktailByCategoryCocktail().subscribe((res: { drinks: Drink[] }) => {
        this.refilter(currentDrinks, res.drinks);
      });
    }
  }

  refilter(originalResults: Drink[], newDrinks: Drink[]) {
    if (originalResults === null || newDrinks === null) {
      this.drinks = [];
      this.drinkFetched = true;
      return;
    }
    const drinkNamesSet = new Set();
    newDrinks.forEach(drink => drinkNamesSet.add(drink.strDrink));
    this.drinks = originalResults.filter(drink => drinkNamesSet.has(drink.strDrink));
    this.drinkFetched = true;
  }
}
