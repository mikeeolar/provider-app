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
        this.allJobs = resData;
      });
    });
  }

  jobProgress(providerId: number) {
    this.bookingService.acceptJobStatus(providerId).subscribe( () => {
      this.router.navigate(["/job-progress", providerId]);
    });
  }
}
