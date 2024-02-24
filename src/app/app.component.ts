import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedEmoji: string = '';
  title = 'CalCraft';
  constructor(public dialog: MatDialog, counter: CounterService) {}
  openDialog() {
    let dialog = this.dialog.open(SettingsDialogComponent);
  }
}
