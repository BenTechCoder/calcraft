import { Injectable } from '@angular/core';
import { calorieItem } from './calorieItem.model';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {}
  private calItems: calorieItem[] = [
    new calorieItem('tacos', 200),
    new calorieItem('Pizzaa', 600),
  ];

  addCalitem(item: calorieItem) {
    this.calItems.push(item);
  }

  removeCalItem(item: calorieItem) {}

  getCalItems() {
    return this.calItems.slice()
  }

  tallyCalories() {
    return this.calItems.reduce(
      (partialSum, currentNumber): number =>
        partialSum + currentNumber.calories,
      0
    );
  }
}
