import { Component, OnInit } from '@angular/core';
import { trainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciceSubscription: Subscription;
  constructor(private trainingService: trainingService) {}

  ngOnInit(): void {
    this.exerciceSubscription = this.trainingService.exerciseChanged.subscribe(
      (ex) => {
        if (ex) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }
}
