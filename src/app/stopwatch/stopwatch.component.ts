import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnDestroy {
  public time: Date = this.initialTime;
  private intervalSubscriber: Subscription = new Subscription;
  private intervalStep: number = 83;
  public isRun: boolean = false;

  public ngOnDestroy(): void {
    this.intervalSubscriber.unsubscribe();
  }

  public get initialTime(): Date {
    return new Date(1970, 0,1);
  }

  public start(): void {
    this.intervalSubscriber.unsubscribe();

    this.isRun = true;
    this.intervalSubscriber = interval(this.intervalStep)
      .pipe(
        finalize(() => this.isRun = false)
      )
      .subscribe(() => {
        const newDateTimestamp = this.time.getTime() + this.intervalStep;
        this.time = new Date(newDateTimestamp);
      });
  }

  public pause(): void {
    this.intervalSubscriber.unsubscribe();
  }

  public stop(): void {
    this.intervalSubscriber.unsubscribe();
    this.time = this.initialTime;
  }
}
