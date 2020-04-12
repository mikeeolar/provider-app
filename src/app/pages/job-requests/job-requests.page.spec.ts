import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobRequestsPage } from './job-requests.page';

describe('JobRequestsPage', () => {
  let component: JobRequestsPage;
  let fixture: ComponentFixture<JobRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRequestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
