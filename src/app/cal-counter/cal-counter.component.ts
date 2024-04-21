import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { calorieItem } from '../calorieItem.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-cal-counter',
  templateUrl: './cal-counter.component.html',
  styleUrls: ['./cal-counter.component.css'],
})
export class CalCounterComponent implements OnInit {
  constructor(private counter: CounterService, private snackBar: MatSnackBar) {}

  calItems: calorieItem[] = this.counter.getCalItems();
  calorieForm!: FormGroup;

  ngOnInit() {
    this.counter.calItemsEmitter.subscribe((items) => {
      this.calItems = items;
    });
    this.calorieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      calories: new FormControl('', Validators.required),
    });
  }

  addItem(name: string, cals: number) {
    if (name === '') {
      this.snackBar.open(
        'Please enter data before saving calorie item. Please try again.',
        'Dismiss',
        { duration: 2000 }
      );
    } else {
      this.counter.addCalitem(new calorieItem(name, +cals));
      this.calorieForm.reset();
    }
  }

  clearAllItems() {
    this.counter.clearCalItems();
  }

  onSubmit() {
    console.log(this.calorieForm.value);
    this.addItem(
      this.calorieForm.value['name'],
      this.calorieForm.value['calories']
    );
  }
}
