import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobProgressPage } from './job-progress.page';

const routes: Routes = [
  {
    path: '',
    component: JobProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobProgressPageRoutingModule {}
