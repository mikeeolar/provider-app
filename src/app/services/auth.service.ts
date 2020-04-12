import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { tap, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Provider } from "../models/provider.model";
import { BehaviorSubject } from "rxjs";
import { Handy } from "../models/types";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private providers = new BehaviorSubject<Provider>(null);
  isLoggedIn = false;
  token: any;

  constructor(private http: HttpClient, private storage: NativeStorage) {}

  login(email: string, password: string, role: string) {
    return this.http
      .post(environment.serverAPI + "auth/login", { email, password, role })
      .pipe(
        tap((token) => {
          this.storage.setItem("token", token).then(
            () => {
              console.log("Token Stored");
            },
            (error) => console.error("Error storing item", error)
          );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        })
      );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    phoneNumber: string,
    location: string,
    address: string,
    image: string
  ) {
    return this.http.post<{ [key: string]: any }>(
      environment.serverAPI + "auth/register",
      {
        firstName,
        lastName,
        email,
        gender,
        password,
        phoneNumber,
        location,
        address,
        image,
      }
    );
  }

  logout() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + " " + this.token.access_token,
    });
    return this.http
      .get(environment.serverAPI + "auth/logout", { headers: headers })
      .pipe(
        tap((data) => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      );
  }

  // user() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"]+" "+this.token["access_token"]
  //   });
  //   return this.http.get<User>(environment.serverAPI + 'auth/user', { headers: headers })
  //   .pipe(
  //     tap(user => {
  //       return user;
  //     })
  //   )
  // }

  providerData() {
    const headers = new HttpHeaders({
      Authorization: this.token.token_type + " " + this.token.access_token,
    });
    return this.http
      .get<Provider>(environment.serverAPI + "auth/provider", { headers })
      .pipe(
        tap((provider) => {
          this.providers.next(provider);
          return provider;
        })
      );
  }
  
  get providerId() {
    return this.providers.asObservable().pipe(
      map((provider) => {
        if (provider) {
          return provider[0][0].providers.id;
        } else {
          return null;
        }
      })
    );
  }

  getProviders() {
    return this.providers.asObservable().pipe(
      map((provider) => {
        if (provider) {
          return provider;
        } else {
          return null;
        }
      })
    );
  }

  get name() {
    return this.providers.asObservable().pipe(
      map((provider) => {
        if (provider) {
          return provider[0][0].providers.first_name + " " + provider[0][0].providers.last_name;
        } else {
          return null;
        }
      })
    );
  }

  get image() {
    return this.providers.asObservable().pipe(
      map((provider) => {
        if (provider) {
          return provider[0][0].providers.image;
        } else {
          return null;
        }
      })
    );
  }

  get email() {
    return this.providers.asObservable().pipe(
      map((provider) => {
        if (provider) {
          return provider[0][0].providers.email;
        } else {
          return null;
        }
      })
    );
  }

  getToken() {
    return this.storage.getItem("token").then(
      (data) => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      (error) => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
