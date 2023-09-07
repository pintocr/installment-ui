import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserRequest} from "../entities/user-request";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {UserResponse} from "../entities/user-response";
import {Conversation} from "../entities/conversation";

@Injectable({
  providedIn: 'root'
})
export class RestclienthttpService {

  constructor(private http: HttpClient) {}
  someURL ='http://localhost:8080/v1';
  errorMessage = '';

  public getUUID() {
    return this.http.get<Conversation>(this.someURL + '/create');
  }

  public sendQuestion(userRequest: UserRequest) {
    return this.http.post<any>(this.someURL + '/send',  userRequest )
      .pipe(
        catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
          return throwError(() => error);
        }));
  }


  public getAnswer(UUID: String) {
    return this.http.get<UserResponse>(this.someURL + '/poll/' + UUID).pipe(
      catchError(error => {
        console.log("Error: ", error);
        return throwError(() => error);
      }),
    );
  }
}
