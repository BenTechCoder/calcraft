import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-cal-banner',
  templateUrl: './cal-banner.component.html',
  styleUrls: ['./cal-banner.component.css'],
})
export class CalBannerComponent implements OnInit {
  constructor(private counter: CounterService) {}

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;

  total: number = this.counter.tallyCalories();
  limit: number = this.counter.getCalorieLimit();
  
  getSpinnerValue() {
    this.value = (this.total / this.limit) * 100;
  }

  ngOnInit() {
    this.getSpinnerValue();
    this.counter.totalEmitter.subscribe((total) => {
      this.total = total;
      this.getSpinnerValue();
    });
    this.counter.limitEmitter.subscribe(() => {
      this.limit = this.counter.getCalorieLimit()
    })
  }
}
