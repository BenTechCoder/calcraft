import { Component } from '@angular/core';
import { CounterService } from '../counter.service';
import { calorieItem } from '../calorieItem.model';

@Component({
  selector: 'app-cal-counter',
  templateUrl: './cal-counter.component.html',
  styleUrls: ['./cal-counter.component.css']
})
export class CalCounterComponent {
  constructor(private counter:CounterService) {}
  calItems:calorieItem[] = this.counter.getCalItems()
}
