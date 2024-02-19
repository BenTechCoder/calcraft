import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-cal-banner',
  templateUrl: './cal-banner.component.html',
  styleUrls: ['./cal-banner.component.css'],
})
export class CalBannerComponent implements OnInit {
  constructor(private counter: CounterService) {}

  total: number = this.counter.tallyCalories();
  limit: number = 2100;

  ngOnInit() {
    this.counter.totalEmitter.subscribe((total) => {
      this.total = total;
    });
  }
}
