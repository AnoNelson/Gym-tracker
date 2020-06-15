import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { trainingService } from '../training.service';
@Component({
  selector: 'app-current-traning',
  templateUrl: './current-traning.component.html',
  styleUrls: ['./current-traning.component.css'],
})
export class CurrentTraningComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(
    private dialog: MatDialog,
    private trainingService: trainingService
  ) {}

  ngOnInit(): void {
    this.startOrResume();
  }
  startOrResume() {
    console.log(this.trainingService.getRunningExercise().duration * 10);
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercice();
        clearInterval(this.timer);
      }
    }, this.trainingService.getRunningExercise().duration * 10);
  }
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.canceledExercice(this.progress);
      } else {
        this.startOrResume();
      }
    });
  }
}
