import { Component, Input } from '@angular/core';
import { calorieItem } from 'src/app/calorieItem.model';
import { CounterService } from 'src/app/counter.service';

@Component({
  selector: 'app-calitem',
  templateUrl: './calitem.component.html',
  styleUrl: './calitem.component.css',
})
export class CalitemComponent {
  constructor(private counter:CounterService){}
  @Input()
  item!: calorieItem;

  delete(item:calorieItem) {
    this.counter.removeCalItem(item)
  }
}
