import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobProgressPageRoutingModule } from './job-progress-routing.module';

import { JobProgressPage } from './job-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobProgressPageRoutingModule
  ],
  declarations: [JobProgressPage]
})
export class JobProgressPageModule {}
