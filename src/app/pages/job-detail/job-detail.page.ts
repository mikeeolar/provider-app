import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AlertController } from "@ionic/angular";
import { Handy } from "src/app/models/types";
import { BookingService } from "src/app/services/booking.service";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-job-detail",
  templateUrl: "./job-detail.page.html",
  styleUrls: ["./job-detail.page.scss"],
})
export class JobDetailPage implements OnInit {
  serverImage: string;
  allJobs: Handy[];
  userId: number;
  bookingId: number;
  providerId: number;

  constructor(
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
        this.providerId = +paraMap.get('provider-id');
        this.allJobs = resData;
        this.userId = resData[0].user_id;
        this.bookingId = resData[0].id
      });
    });
  }

  startJob() {
    this.alertCtrl.create({
      header: "Confirmation",
      message:
        "Are you sure you want to start this Job",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.bookingService.startJobStatus(this.providerId).subscribe( () => {
              this.router.navigate(["/job-progress", this.providerId]);
            });
          }
        },
        {
          text: "No",
          role: "cancel"
        }
      ],
    }).then(alertEl => {
      alertEl.present();
    });
  }

  completeJob() {
    this.alertCtrl.create({
      header: "Confirmation",
      message:
        "Are you sure this Job is completed",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.bookingService.completeJobStatus(this.providerId).subscribe( () => {
              this.router.navigate(["/job-progress", this.providerId]);
            });
          }
        },
        {
          text: "No",
          role: "cancel"
        }
      ],
    }).then(alertEl => {
      alertEl.present();
    });
  }

  jobProgress(providerId: number) {
    this.bookingService.acceptJobStatus(providerId).subscribe( () => {
      this.bookingService.storeJob(providerId, this.userId, this.bookingId).subscribe ( () => {
        this.router.navigate(["/job-progress", providerId]);
      });
    }); 
  }

  jobHistory() {
    this.router.navigate(["/job-history", this.providerId]);
  }
}
