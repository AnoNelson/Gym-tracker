import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTraningComponent } from './current-traning/current-traning.component';
import { NewTraningComponent } from './new-traning/new-traning.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { ShareModule } from '../auth/share/share.module';
import { StopTrainingComponent } from './current-traning/stop-training.component';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTraningComponent,
    NewTraningComponent,
    PastTrainingsComponent,
  ],
  imports: [ShareModule, TrainingRoutingModule],
  exports: [],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
