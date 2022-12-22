import { Injectable } from '@angular/core';
import { trainingWeeks, _trainingWeeksFromAPI } from '../types/interfaces';
import { firstValueFrom, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = "http://localhost:3000/trainings"

  trainingWeeks$: Subject<trainingWeeks[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getTrainingWeeks() {
    const response: trainingWeeks[] | undefined = [];

    this.httpClient.get<_trainingWeeksFromAPI[]>(this.url).subscribe(res => {
      res.map(r => response.push({
        km: r.km,
        startDate: DateTime.fromISO(r.start_date),
        training_week: r.training_week,
        type: r.type
      }))

      this.trainingWeeks$.next(response);
    });
  }
}
