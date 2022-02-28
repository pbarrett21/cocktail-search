import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(private http: HttpClient) { }

  getRandomCocktail(): Observable<any> {
    return this.http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  }

  searchCocktailByName(name: string): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
  }

  searchCocktailByIngredient(ingredient: string): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  }

  filterCocktailByCategoryOrdinary(): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
  }

  filterCocktailByCategoryCocktail(): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
  }

  filterCocktailByAlcoholic(): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
  }

  filterCocktailByNonAlcoholic(): Observable<any> {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
  }

}
