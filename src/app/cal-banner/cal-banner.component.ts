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
  calorieSpinnerValue = 0;
  protienProgressBarValue = 0;

  calorieTotal: number = this.counter.tallyCalories();
  calorieLimit: number = this.counter.getCalorieLimit();
  proteinTotal: number = this.counter.tallyProtein()
  proteinLimit:number = 129;

  getPercentageValue(total:number, limit:number) {
    return (total / limit) * 100;
  }

  ngOnInit() {
    this.calorieSpinnerValue = this.getPercentageValue(this.calorieTotal, this.calorieLimit);
    this.protienProgressBarValue = this.getPercentageValue(this.proteinTotal, this.proteinLimit)
    this.counter.totalEmitter.subscribe((total) => {
      this.calorieTotal = total;
      this.calorieSpinnerValue = this.getPercentageValue(this.calorieTotal, this.calorieLimit);
      this.proteinTotal = this.counter.tallyProtein()
      this.protienProgressBarValue = this.getPercentageValue(this.proteinTotal, this.proteinLimit)
    });

    this.counter.limitEmitter.subscribe(() => {
      this.calorieLimit = this.counter.getCalorieLimit();
    });
  }
}
