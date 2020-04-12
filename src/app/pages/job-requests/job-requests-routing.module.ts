import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobRequestsPage } from './job-requests.page';

const routes: Routes = [
  {
    path: '',
    component: JobRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRequestsPageRoutingModule {}
