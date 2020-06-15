import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Exercise } from '../exercise.model';
import { trainingService } from '../training.service';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/auth/share/ui.service';

@Component({
  selector: 'app-new-traning',
  templateUrl: './new-traning.component.html',
  styleUrls: ['./new-traning.component.css'],
})
export class NewTraningComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  training: Exercise[];
  exercicesSubscription: Subscription[] = [];
  isLoading = true;
  constructor(
    private trainingService: trainingService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.exercicesSubscription.push(
      this.uiService.loadingState.subscribe((su) => {
        this.isLoading = su;
      })
    );
    this.exercicesSubscription.push(
      this.trainingService.exercisesChanged.subscribe((ex) => {
        this.training = ex;
        console.log(this.training);
      })
    );
    this.trainingService.fetchExercise();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercices(form.value.exId);
  }
  ngOnDestroy() {
    if (this.exercicesSubscription) {
      this.exercicesSubscription.forEach((au) => au.unsubscribe());
    }
  }
  fetchExercises() {
    this.trainingService.fetchExercise();
  }
}
