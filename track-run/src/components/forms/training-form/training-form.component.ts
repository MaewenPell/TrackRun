import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-training-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent {

  constructor(private httpClient: HttpClient) { }

  trainingWeekForm = new FormGroup({
    startDate: new FormControl(DateTime.now().toJSDate()),
    km: new FormControl(),
    type: new FormControl(),
  })

  postTrainingData() {
    this.httpClient.post("http://localhost:3000/trainings", this.trainingWeekForm.value).subscribe(res => {
      console.log(res);
    })
  }

}
