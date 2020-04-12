import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobRequestsPageRoutingModule } from './job-requests-routing.module';

import { JobRequestsPage } from './job-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobRequestsPageRoutingModule
  ],
  declarations: [JobRequestsPage]
})
export class JobRequestsPageModule {}
