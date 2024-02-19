import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalBannerComponent } from './cal-banner/cal-banner.component';
import { CounterService } from './counter.service';
// import { CalCounterModule } from './cal-counter/cal-counter.module';
import { CalCounterComponent } from './cal-counter/cal-counter.component';
import { CalitemComponent } from './cal-counter/calitem/calitem.component';


@NgModule({
  declarations: [AppComponent, CalBannerComponent, CalCounterComponent, CalitemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
  ],
  providers: [CounterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
