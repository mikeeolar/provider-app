import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { JobPopoverMenuComponent } from 'src/app/shared/pickers/job-popover-menu/job-popover-menu.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Handy } from 'src/app/models/types';
import * as moment from "moment";

@Component({
  selector: 'app-job-progress',
  templateUrl: './job-progress.page.html',
  styleUrls: ['./job-progress.page.scss'],
})
export class JobProgressPage implements OnInit {
  serverImage: string;
  allJobs: Handy[];
  userId: number;
  userAddress: string;
  userName: string;
  userLocation: string;
  userImage: string;
  jobTime: string;

  constructor(
    private popoverCrtl: PopoverController,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      this.bookingService.getAllJobs(+paraMap.get('provider-id')).subscribe((resData) => {
        this.allJobs = resData;

        this.userId = +paraMap.get('provider-id');
        this.userName = resData[0].users.first_name + resData[0].users.last_name;
        this.userLocation = resData[0].location;
        this.userAddress = resData[0].address;

        this.jobTime = moment(resData[0].updated_at).format("h:mma");
        console.log(moment(resData[0].updated_at).format("h:mma"));
      });
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCrtl.create({
      component: JobPopoverMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
