import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class QAndAService {

  constructor(private http: HttpClient) {}
  someURL ='https://api.de/test';
  UUID = '';
  errorMessage = '';
  answer = '';

  public sendQuestion(term: string) {
    term = term.trim();
    return this.http.post<any>(this.someURL, { question: term })
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);

        return throwError(() => error);;
      }))
      .subscribe(data => {
        this.UUID = data.UUID;
      })
  }


  public getAnswer(UUID: string){
    return this.http.get<any>(this.someURL + '/' + UUID).pipe(
      catchError(error => {
        console.log("Error: ", error);
        return throwError(() => error);
      }),
    ).subscribe(data => {
      this.answer = data.answer;
    });
  }
}
