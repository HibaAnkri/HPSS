import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  minutes: number = 30;
  seconds: number = 0;
  private subscription?: Subscription;

  get isTimeCritical(): boolean {
    return this.minutes === 0 && this.seconds < 60;
  }

  ngOnInit() {
    const timer$ = interval(1000);
    this.subscription = timer$.subscribe(() => this.updateTime());
  }

  updateTime() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.subscription?.unsubscribe();
      } else {
        this.minutes--;
        this.seconds = 59;
      }
    } else {
      this.seconds--;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
