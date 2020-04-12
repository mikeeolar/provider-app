import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {} from "google-maps";
import * as moment from "moment";
import { Provider } from "src/app/models/provider.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  providers: Provider;
  providerId: number;
  providerImage: string;
  providerName: string;
  category: string;
  lat: any;
  lng: any;
  currentLocation: string;
  serverImage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private geolocation: Geolocation
  ) {
    this.serverImage = environment.ImageAPI;
  }

  ngOnInit() {
    // const da = new Date("2020-03-02");
    // console.log(da.getDate());
    // console.log(moment().subtract(da.getDate(), 'days').calendar());
    this.authService.providerData().subscribe((providers) => {
      this.providerName =
        providers[0][0].providers.first_name +
        " " +
        providers[0][0].providers.last_name;
      this.providerImage = this.serverImage + providers[0][0].providers.image;
      this.category = providers[0][0].providers.provider_services[0].categories.name;
    });
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        this.geolocation
          .getCurrentPosition()
          .then((resData) => {
            this.lat = resData.coords.latitude;
            this.lng = resData.coords.longitude;

            const geocoder = new google.maps.Geocoder();
            this.geocodeLatLng(geocoder);
          })
          .catch((error) => {
            console.log("Error getting location", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  geocodeLatLng(geocoder) {
    const lat = this.lat;
    const lng = this.lng;

    const location = new google.maps.LatLng(this.lat, this.lng);
    geocoder.geocode({ location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.currentLocation = results[0].formatted_address;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIg3AmCwLxjV2gCUIBluBYr20gHVa_oTA";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps SDK not available.");
        }
      };
    });
  }
}
