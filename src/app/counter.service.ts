import { EventEmitter, Injectable } from '@angular/core';
import { calorieItem } from './calorieItem.model';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {}

  totalEmitter = new EventEmitter<number>();
  calItemsEmitter = new EventEmitter<calorieItem[]>

  private calItems: calorieItem[] = [
    new calorieItem('tacos', 200),
    new calorieItem('Pizzaa', 600),
  ];

  addCalitem(item: calorieItem) {
    this.calItems.push(item);
    this.calItemsEmitter.emit(this.calItems)
    this.totalEmitter.emit(this.tallyCalories())

  }

  removeCalItem(item: calorieItem) {
    this.totalEmitter.emit(this.tallyCalories())
  }

  getCalItems() {
    return this.calItems.slice();
  }

  tallyCalories() {
    return this.calItems.reduce(
      (partialSum, currentNumber): number =>
        partialSum + currentNumber.calories,
      0
    );
  }
}
