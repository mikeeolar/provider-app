import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Booking } from "../models/booking.mode";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Service, Handy } from "../models/types";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private bookings = new BehaviorSubject<Booking>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllJobs(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "get-jobs/" + providerId)
      .pipe(
        map((resData) => {
          return resData.Jobs;
        })
      );
  }

  getJobs(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "all-jobs/" + providerId)
      .pipe(
        map((resData) => {
          return resData.Jobs;
        })
      );
  }

  getPendingJobs(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "get-pending-jobs/" + providerId)
      .pipe(
        map((resData) => {
          return resData.Jobs;
        })
      );
  }

  getAcceptedJobs(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "get-accepted-jobs/" + providerId)
      .pipe(
        map((resData) => {
          return resData.Jobs;
        })
      );
  }

  getJobDetails(providerId: number): Observable<any> {
    return this.http
      .get<Handy>(environment.serverAPI + "job-details/" + providerId)
      .pipe(
        map((resData) => {
          return resData.ProviderBookings;
        })
      );
  }

  cancelBooking(providerId: number) {
    return this.http
      .get<{ [key: string]: any }>(
        environment.serverAPI + "cancel/" + providerId
      )
      .pipe(
        map((resData) => {
          return resData.Message;
        })
      );
  }

  storeJob(providerId: number, userId: number, bookingId: number) {
    return this.http.post<{ [key: string]: any }>(
      environment.serverAPI + "job",
      {
        providerId,
        userId,
        bookingId,
      }
    );
  }

  acceptJobStatus(providerId: number) {
    return this.http
      .get<{ [key: string]: any }>(
        environment.serverAPI + "job-status-accept/" + providerId
      )
      .pipe(
        map((resData) => {
          return resData.Message;
        })
      );
  }

  startJobStatus(providerId: number) {
    return this.http
      .get<{ [key: string]: any }>(
        environment.serverAPI + "update-start-job/" + providerId
      )
      .pipe(
        map((resDate) => {
          return resDate.Message;
        })
      );
  }

  completeJobStatus(providerId: number) {
    return this.http
      .get<{ [key: string]: any }>(
        environment.serverAPI + "update-complete-job/" + providerId
      )
      .pipe(
        map((resDate) => {
          return resDate.Message;
        })
      );
  }
}
