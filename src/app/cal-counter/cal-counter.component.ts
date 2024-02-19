import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { calorieItem } from '../calorieItem.model';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-cal-counter',
  templateUrl: './cal-counter.component.html',
  styleUrls: ['./cal-counter.component.css'],
})
export class CalCounterComponent implements OnInit {
  constructor(private counter: CounterService) {}
  calItems: calorieItem[] = this.counter.getCalItems();

  ngOnInit() {
   this.counter.calItemsEmitter.subscribe((items) => {
    this.calItems = items
   })
  }

  // TODO Add code to reset values of Inputs
  // TODO: check if name input is not blank if so reject the input if not proceed as normal
  addItem(name:HTMLInputElement, cals:HTMLInputElement) {
    this.counter.addCalitem(new calorieItem(name.value, +cals.value))
  }

  clearAllItems() {
    this.counter.clearCalItems()
  }
}
