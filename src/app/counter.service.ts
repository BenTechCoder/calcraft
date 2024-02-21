import { EventEmitter, Injectable } from '@angular/core';
import { calorieItem } from './calorieItem.model';
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor() {
    if (
      localStorage.getItem('calItems') === null &&
      localStorage.getItem('calLimit') === null
    ) {
      this.localStorgeUpdate();
    } else {
      this.calItems = JSON.parse(localStorage.getItem('calItems') || '{}');
      this.calLimit = JSON.parse(localStorage.getItem('calLimit') || '{}');
      console.log('current app going strong');
    }
  }

  totalEmitter = new EventEmitter<number>();
  limitEmitter = new EventEmitter<number>();
  calItemsEmitter = new EventEmitter<calorieItem[]>();

  private calItems: calorieItem[] = [];
  private calLimit: number = 0;

  localStorgeUpdate() {
    let calItemsstorage = JSON.stringify(this.calItems);
    let calLimitStorage = JSON.stringify(this.calLimit);
    localStorage.setItem('calItems', calItemsstorage);
    localStorage.setItem('calLimit', calLimitStorage);
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
    this.totalEmitter.emit(this.tallyCalories());
    this.localStorgeUpdate();
  }

  tallyCalories() {
    return this.calItems.reduce((partialSum, currentNumber): number => {
      return partialSum + currentNumber.calories;
    }, 0);
  }

  getCalorieLimit(): number {
    return this.calLimit;
  }

  setCalorieLimit(limit: number) {
    this.calLimit = limit;
    this.limitEmitter.emit(limit);
    this.localStorgeUpdate();
  }
}
