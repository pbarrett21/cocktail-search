import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Output() filterQuery: EventEmitter<{
    input: string,
    type: string,
    isCocktail: string,
    isAlcoholic: string
  }> = new EventEmitter<{
    input: string,
    type: string,
    isCocktail: string,
    isAlcoholic: string
  }>();

  filterForm: FormGroup = new FormGroup({});
  filterOptions = ['Name', 'Ingredient'];
  cocktailOptions = ['Ordinary', 'Cocktail', 'Both'];
  alcoholOptions = ['Alcoholic', 'Non-alcoholic', 'Both'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      searchInput: ['', Validators.required],
      filterType: ['Name', Validators.required],
      ordinaryOrCocktail: ['Both', Validators.required],
      nonAlcOrAlc: ['Both', Validators.required]
    });
  }

  submitFilterQuery() {
    this.filterQuery.emit({
      input: this.filterForm.controls['searchInput'].value,
      type: this.filterForm.controls['filterType'].value,
      isCocktail: this.filterForm.controls['ordinaryOrCocktail'].value,
      isAlcoholic: this.filterForm.controls['nonAlcOrAlc'].value
    })
  }

}
