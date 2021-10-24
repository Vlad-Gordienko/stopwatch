import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit, OnDestroy {
  public time: Date = new Date(1970, 0,1);
  private intervalSubscriber: Subscription = new Subscription;
  private intervalStep: number = 83;
  public isRun: boolean = false;

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.intervalSubscriber.unsubscribe();
  }


  public start(): void {
    this.isRun = true;
    this.intervalSubscriber.unsubscribe();
    this.intervalSubscriber = interval(this.intervalStep)
      .subscribe(() => {
        const newDateTimestamp = this.time.getTime() + this.intervalStep;
        this.time = new Date(newDateTimestamp);
      });
  }

  public pause(): void {
    this.intervalSubscriber.unsubscribe();
    this.isRun = false;
  }

  public stop(): void {
    this.intervalSubscriber.unsubscribe();
    this.time = new Date(1970, 0,1);
    this.isRun = false;
  }
}
