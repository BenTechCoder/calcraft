import { EventEmitter, Injectable } from '@angular/core';
import { calorieItem } from './calorieItem.model';
import { Subject } from 'rxjs';
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
  // TODO: Add protein counter feature - added to form and data structure, now to make it optional and hidden by defualt
  // TODO refactor eventEmitters to RXJS subjects
  // TODO: look into undo feature
  // TODO: look into backgroundSync with NG-PWA module
  // TODO: uSE ANGULAR ANIMATIONS to add movement to everything

  totalEmitter = new Subject<number>();
  limitEmitter = new Subject<number>();
  calItemsEmitter = new Subject<calorieItem[]>();

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
    this.calItemsEmitter.next(this.calItems);
    this.totalEmitter.next(this.tallyCalories());
    this.localStorgeUpdate();
  }

  removeCalItem(item: calorieItem) {
    let filter = this.calItems.filter((item2) => {
      return item2 !== item;
    });
    this.calItems = filter;
    this.totalEmitter.next(this.tallyCalories());
    this.calItemsEmitter.next(this.calItems);
    console.log(filter);
    this.localStorgeUpdate();
  }

  editCalItem(item: calorieItem, updatedName: string, updatedCalories: number) {
    const id: string = item.id;
    const index = this.calItems.findIndex((index) => index.id == item.id);
    const itemToUpdate = this.calItems[index];
    itemToUpdate.name = updatedName;
    itemToUpdate.calories = updatedCalories;
    this.localStorgeUpdate();
    this.totalEmitter.next(this.tallyCalories());
  }

  getCalItems() {
    return this.calItems.slice();
  }

  clearCalItems() {
    this.calItems.length = 0;
    this.calItemsEmitter.next(this.calItems);
    this.totalEmitter.next(this.tallyCalories());
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
    this.limitEmitter.next(limit);
    this.totalEmitter.next(this.tallyCalories());
    this.localStorgeUpdate();
  }
}
