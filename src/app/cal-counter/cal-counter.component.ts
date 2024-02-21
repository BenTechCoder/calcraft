import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { calorieItem } from '../calorieItem.model';
import { ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cal-counter',
  templateUrl: './cal-counter.component.html',
  styleUrls: ['./cal-counter.component.css'],
})
export class CalCounterComponent implements OnInit {
  constructor(private counter: CounterService, private snackBar: MatSnackBar) {}

  calItems: calorieItem[] = this.counter.getCalItems();

  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef =
    {} as ElementRef;
  @ViewChild('calorieInput', { static: false }) calorieInputRef: ElementRef =
    {} as ElementRef;

  ngOnInit() {
    this.counter.calItemsEmitter.subscribe((items) => {
      this.calItems = items;
    });
  }

  addItem(name: HTMLInputElement, cals: HTMLInputElement) {
    if (name.value === '') {
      this.snackBar.open(
        'Error saving calorie item. Please try again.',
        'Dismiss',
        { duration: 2000 }
      );
    } else {
      this.counter.addCalitem(new calorieItem(name.value, +cals.value));
      this.nameInputRef.nativeElement.value = '';
      this.calorieInputRef.nativeElement.value = '';
    }
  }

  clearAllItems() {
    this.counter.clearCalItems();
  }
}
