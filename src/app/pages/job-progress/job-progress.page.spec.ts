import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobProgressPage } from './job-progress.page';

describe('JobProgressPage', () => {
  let component: JobProgressPage;
  let fixture: ComponentFixture<JobProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProgressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
