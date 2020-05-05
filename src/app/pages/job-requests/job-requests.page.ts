import { Component, OnInit } from "@angular/core";
import { Handy } from "src/app/models/types";
import { Router } from "@angular/router";
import { BookingService } from "src/app/services/booking.service";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import * as moment from "moment";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-job-requests",
  templateUrl: "./job-requests.page.html",
  styleUrls: ["./job-requests.page.scss"],
})
export class JobRequestsPage implements OnInit {
  serverImage: string;
  allJobs: Handy[];
  pendingJobs: Handy[];
  acceptedJobs: Handy[];
  providerId: number;
  jobDate: string;
  date: number;
  momentDate: string;
  isPending = true;
  jobStatus: string;
  event: any;

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    this.authService.providerId.subscribe((fetchedId) => {
      this.bookingService.getAllJobs(+fetchedId).subscribe((resData) => {
        if (resData[0].status === "Pending") {
          this.allJobs = resData;
          this.jobStatus = resData[0].status;
        } else {
          this.allJobs = null;
          this.jobStatus = resData[0].status;
        }
      });
    });
  }

  ionViewWillEnter() {
    
  }

  actionJob(providerId: number) {
    if (this.isPending) {
      this.bookingService.acceptJobStatus(providerId).subscribe((resData) => {
        this.alertCtrl
          .create({
            header: "Job Accepted",
            message:
              "You've accepted the Job. Click on the UPCOMING tab to get started on the Job.",
            buttons: [
              {
                text: "OK",
                handler: () => {
                  this.ionViewWillEnter();
                },
              },
            ],
          })
          .then((alertEl) => {
            alertEl.present();
          });
      });
    }
  }

  refresh() {
    this.ngOnInit();
    this.authService.providerId.subscribe((fetchedId) => {
      this.bookingService.getAcceptedJobs(+fetchedId).subscribe((resData) => {
        this.allJobs = resData;
      });
    });
  }

  segmentChanged(event: any) {
    if (event.detail.value === "pending") {
      this.isPending = true;
      this.authService.providerId.subscribe((fetchedId) => {
        this.bookingService.getPendingJobs(+fetchedId).subscribe((resData) => {
          this.allJobs = resData;
        });
      });
    } else if (event.detail.value === "upcoming") {
      this.isPending = false;
      this.authService.providerId.subscribe((fetchedId) => {
        this.bookingService.getAllJobs(+fetchedId).subscribe((resData) => {
          if (resData[0].status === "Accepted" || resData[0].status === "Started") {
            this.allJobs = resData;
          } else {
            this.allJobs = null;
          }
        });
      });
    } else if (event.detail.value === "past") {
      this.authService.providerId.subscribe((fetchedId) => {
        this.bookingService.getAllJobs(+fetchedId).subscribe((resData) => {
          if (resData[0].status === "Completed") {
            this.allJobs = resData;
          } else {
            this.allJobs = null;
          }
        });
      });
    }
  }

  jobDetail(providerId: number) {
    this.router.navigate(["/job-detail", providerId]);
  }
}
