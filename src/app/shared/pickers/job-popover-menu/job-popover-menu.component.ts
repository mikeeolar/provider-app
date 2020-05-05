import { Component, OnInit } from "@angular/core";
import {
  PopoverController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { BookingService } from "src/app/services/booking.service";
import { AuthService } from "src/app/services/auth.service";
import { Handy } from "src/app/models/types";
import * as moment from "moment";
import { MapModalComponent } from "../../map-modal/map-modal.component";

@Component({
  selector: "app-job-popover-menu",
  templateUrl: "./job-popover-menu.component.html",
  styleUrls: ["./job-popover-menu.component.scss"],
})
export class JobPopoverMenuComponent implements OnInit {
  serverImage: string;
  allJobs: Handy[];
  userId: number;
  userAddress: string;
  userName: string;
  userLocation: string;
  userImage: string;
  jobTime: string;
  providerId: number;

  constructor(
    private popoverCrtl: PopoverController,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authService.providerId.subscribe((fetchedId) => {
      this.providerId = +fetchedId;
      this.bookingService.getAllJobs(+fetchedId).subscribe((resData) => {
        this.allJobs = resData;

        this.userName =
          resData[0].users.first_name + resData[0].users.last_name;
        this.userLocation = resData[0].location;
        this.userAddress = resData[0].address;

        console.log(this.userLocation);
        this.jobTime = moment(resData[0].updated_at).format("h:mma");
      });
    });
  }

  openMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          providerId: this.userId,
          providerLocation: this.userLocation,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }

  dismissPopover() {
    this.popoverCrtl.dismiss();
  }
}
