import { EventEmitter, Injectable } from '@angular/core';
import { calorieItem } from './calorieItem.model';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {
    if (localStorage.getItem('calItems') === null) {
      this.localStorgeUpdate();
    } else {
      this.calItems = JSON.parse(localStorage.getItem('calItems') || '{}');
      console.log('current app going strong');
    }
  }

  totalEmitter = new EventEmitter<number>();
  calItemsEmitter = new EventEmitter<calorieItem[]>();

  private calItems: calorieItem[] = [];

  localStorgeUpdate() {
    let storage = JSON.stringify(this.calItems);
    localStorage.setItem('calItems', storage);
  }

  addCalitem(item: calorieItem) {
    this.calItems.push(item);
    this.calItemsEmitter.emit(this.calItems);
    this.totalEmitter.emit(this.tallyCalories());
    this.localStorgeUpdate();
  }

  removeCalItem(item: calorieItem) {
    let filter = this.calItems.filter((item2) => {
      return item2 !== item;
    });
    this.calItems = filter;
    this.totalEmitter.emit(this.tallyCalories());
    this.calItemsEmitter.emit(this.calItems);
    console.log(filter);
    this.localStorgeUpdate();
  }

  getCalItems() {
    return this.calItems.slice();
  }

  clearCalItems() {
    this.calItems.length = 0;
    this.calItemsEmitter.emit(this.calItems);
    this.totalEmitter.emit(this.tallyCalories())
    this.localStorgeUpdate();
  }

  tallyCalories() {
    return this.calItems.reduce(
      (partialSum, currentNumber): number =>
        partialSum + currentNumber.calories,
      0
    );
  }

  getCalorieLimit():number {
    // get input behind settings dialog for calorie limit with default being blank
    return 2100
  }
}
