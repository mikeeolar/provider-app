import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobPopoverMenuComponent } from './pickers/job-popover-menu/job-popover-menu.component';

@NgModule({
  declarations: [
    ImagePickerComponent,
    MapModalComponent,
    JobPopoverMenuComponent
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [ImagePickerComponent, MapModalComponent, JobPopoverMenuComponent],
  entryComponents: [MapModalComponent, JobPopoverMenuComponent]
})
export class SharedModule {}