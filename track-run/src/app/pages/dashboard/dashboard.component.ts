import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DateTime } from 'luxon';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { _trainingWeeksFromAPI } from 'src/app/types/interfaces';
import { ChartUtilsForTrainingWeek } from './dashboard_utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  private destroy$ = new Subject<boolean>();

  private trainingStartDatesInMs: number[] = [];
  private aggregationDateKms: [number, number][] = [];

  chartOptions!: EChartsOption;
  trainingWeeks!: _trainingWeeksFromAPI[];


  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getTrainingWeeks();

    this.dashboardService.trainingWeeks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        const chartUtils = new ChartUtilsForTrainingWeek(res);
        this.trainingStartDatesInMs = chartUtils.trainingWeeksStartDatesInMs;
        this.aggregationDateKms = chartUtils.aggregatedValues;

        this.generateTrainingWeeksChart();
      })
  }

  generateTrainingWeeksChart() {
    let diff = 0;
    if (this.aggregationDateKms) {
      const startDate = DateTime.fromMillis(this.aggregationDateKms[0][0]);
      const endDate = DateTime.fromMillis(this.aggregationDateKms[2][0]);

      diff = endDate.diff(startDate).days;
    }
    this.chartOptions = {
      xAxis: {
        type: 'time',
        data: this.trainingStartDatesInMs,
        axisLabel: {
          formatter: '{yyyy}-{MM}-{dd}',
          showMinLabel: true,
          showMaxLabel: true
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.aggregationDateKms,
          type: 'bar',
          barWidth: `${diff / this.aggregationDateKms.length * 100}%`,
          label: {
            align: 'left',
          }
        }
      ]
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
