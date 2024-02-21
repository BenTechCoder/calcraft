import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css',
})
export class SettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    public counter: CounterService
  ) {}
  saveCalorieLimit(limit: number) {
    this.dialogRef.close();
    this.counter.setCalorieLimit(limit);
  }
}
