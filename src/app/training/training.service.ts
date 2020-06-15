import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { UiService } from '../auth/share/ui.service';

@Injectable()
export class trainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  fineshedAndCanceledChanged = new Subject<Exercise[]>();
  constructor(private db: AngularFirestore, private uiService: UiService) {}
  private availableExercise: Exercise[] = [];
  private runningExercice: Exercise;
  private afSub: Subscription[] = [];

  fetchExercise() {
    // this.afSub.push(
    //   this.db
    //     .collection('availableExercises')
    //     .snapshotChanges()
    //     .pipe(
    //       map((docArray) => {
    //         return docArray.map((doc) => {
    //           return {
    //             id: doc.payload.doc.id,
    //             name: doc.payload.doc.data().name,
    //             duration: doc.payload.doc.data().duration,
    //             calories: doc.payload.doc.data().calories,
    //           };
    //         });
    //       })
    //     )
    //     .subscribe(
    //       (exercises: Exercise[]) => {
    //         this.availableExercise = exercises;
    //         this.exercisesChanged.next([...this.availableExercise]);
    //         this.uiService.loadingState.next(false);
    //       },
    //       (error) => {
    //         this.uiService.loadingState.next(false);
    //         this.uiService.showSnackBar(
    //           'the data are not available now please try again later',
    //           null,
    //           3000
    //         );
    //         this.exercisesChanged.next(null);
    //       }
    //     )
    // );
  }

  startExercices(selectedId: string) {
    this.runningExercice = this.availableExercise.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercice });
  }
  completeExercice() {
    this.addDataToDataBase({
      ...this.runningExercice,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  canceledExercice(progress: number) {
    this.addDataToDataBase({
      ...this.runningExercice,
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.calories * (progress / 100),
      date: new Date(),
      state: 'cancalled',
    });
    this.runningExercice = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise() {
    return { ...this.runningExercice };
  }
  getCompletedOrCanceledExercises() {
    this.afSub.push(
      this.db
        .collection('finishedExercices')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.fineshedAndCanceledChanged.next(exercises);
        })
    );
  }
  getAvailableExercices() {
    //this.fetchExercise();
    return this.availableExercise;
  }
  private addDataToDataBase(exe: Exercise) {
    this.db.collection('finishedExercices').add(exe);
  }
  removeSubscription() {
    this.afSub.forEach((sub) => sub.unsubscribe());
  }
}
