import { Component } from '@angular/core';
import {concatMap, interval, of, Subject, takeUntil} from "rxjs";
import {UserResponse} from "../entities/user-response";
import {UserRequest} from "../entities/user-request";
import {RestclienthttpService} from "../service/restclienthttp.service";
import {Conversation} from "../entities/conversation";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  private uuid: String = "";

  private stopPollingSubject = new Subject<void>();

  constructor(private httpService: RestclienthttpService) {
  }

  public onBtnClickedEvent() {

    const question = "asdf";

    this.httpService.getUUID()
      .pipe(
        concatMap((uuid: Conversation) => {
          this.uuid = uuid.id;
          return of(uuid);
        }),
        concatMap(() => {
          const newRequest: UserRequest =  {
            conversationId: this.uuid,
            command: question
          }
          return this.httpService.sendQuestion(newRequest);
        }),
        concatMap(() => {
          return interval(2000).pipe(
            concatMap(() => {
              return this.httpService.getAnswer(this.uuid);
            }),
            takeUntil(this.stopPollingSubject)
          )
        }),
        concatMap((resp: UserResponse) => {
          if ( resp.ready ) {
            this.stopPollingSubject.next();
          }
          return of(resp);
        })
      )
      .subscribe((response) => console.log(response));
  }

}
