import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { calorieItem } from 'src/app/calorieItem.model';
import { CounterService } from 'src/app/counter.service';
import { CalItemEditComponent } from '../cal-item-edit/cal-item-edit.component';

@Component({
  selector: 'app-calitem',
  templateUrl: './calitem.component.html',
  styleUrl: './calitem.component.css',
})
export class CalitemComponent {
  constructor(private counter: CounterService, public dialog: MatDialog) {}
  @Input()
  item!: calorieItem;

  onDelete(item: calorieItem) {
    this.counter.removeCalItem(item);
  }

  onEdit(item: calorieItem) {
    let dialog = this.dialog.open(CalItemEditComponent,
      {
        data: item
      });
  }
}
