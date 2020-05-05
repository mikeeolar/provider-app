import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Handy } from 'src/app/models/types';
import * as moment from "moment";

@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.page.html',
  styleUrls: ['./job-history.page.scss'],
})
export class JobHistoryPage implements OnInit {
  serverImage: string;
  allJobs: Handy[];
  userId: number;
  userAddress: string;
  userName: string;
  userLocation: string;
  userImage: string;
  acceptjobTime: string;
  startJobTime: string;
  completeJobTime: string;
  bookingId: number;
  providerId: number;

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
      this.bookingService.getJobs(+paraMap.get('provider-id')).subscribe((resData) => {
        this.allJobs = resData;

        this.userId = resData[0].users.id;
        this.userName = resData[0].users.first_name + resData[0].users.last_name;
        this.userLocation = resData[0].bookings.location;
        this.userAddress = resData[0].bookings.address;
        this.bookingId = resData[0].bookings.id;
        this.providerId = resData[0].providers.id;

        this.acceptjobTime = moment(resData[0].accepted_at).format("DD-MM-YYYY h:mma");
        this.startJobTime = moment(resData[0].started_at).format("DD-MM-YYYY h:mma");
        this.completeJobTime = moment(resData[0].completed_at).format("DD-MM-YYYY h:mma");

      });
    });
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }
}
