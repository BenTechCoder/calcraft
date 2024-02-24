import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
  AfterViewInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calorieItem } from 'src/app/calorieItem.model';
import { CounterService } from 'src/app/counter.service';

@Component({
  selector: 'app-cal-item-edit',
  templateUrl: './cal-item-edit.component.html',
  styleUrl: './cal-item-edit.component.css',
})
export class CalItemEditComponent implements AfterViewInit {
  constructor(@Inject(MAT_DIALOG_DATA) public calItem: calorieItem, private counter:CounterService, public dialogRef: MatDialogRef<CalItemEditComponent>) {}
  // @ViewChild('nameEditInput', { static: false }) nameInputRef: ElementRef =
  //   {} as ElementRef;
  // @ViewChild('calorieEditInput', { static: false })
  // calorieInputRef: ElementRef = {} as ElementRef;

  ngAfterViewInit() {
    // this.nameInputRef.nativeElement.value = this.calItem.name;
    // this.calorieInputRef.nativeElement.value = this.calItem.calories;
  }

  saveEdit(name:string, calories:number) {
    this.counter.editCalItem(this.calItem, name, calories)
    this.dialogRef.close()
  }
}
