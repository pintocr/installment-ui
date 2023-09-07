import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {concatMap, interval, of, Subject, takeUntil} from "rxjs";
import {UserResponse} from "../entities/user-response";
import {UserRequest} from "../entities/user-request";
import {RestclienthttpService} from "../service/restclienthttp.service";
import {Conversation} from "../entities/conversation";
import {TemplateConversation} from "../entities/template-conversation";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  formName: FormGroup;

  private defaultResponseText = "The AI is still computing an anwser! :)";
  private startResponseText  = "The AI is computing an anwser! :)";

  private uuid: String = "";

  stopPollingSubject = new Subject<void>();

  conversations: TemplateConversation[] = [];

  constructor(private fb: FormBuilder, private httpService: RestclienthttpService) {
    this.formName = fb.group({
      name: new FormControl<String>('', Validators.required)
    });
  }

  public onBtnClickedEvent() {
    if ( this.formName.valid ) {
      const question = this.formName.value.name;
      this.addTemplateConversation(0, question);

      this.httpService.getUUID()
        .pipe(
          concatMap((uuid: Conversation) => {
            this.uuid = uuid.id;
            this.addTemplateConversation(1, this.startResponseText)
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
            return interval(15000).pipe(
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
        .subscribe((response) => {
          if ( response.ready ) {
            this.addTemplateConversation(1, response.response);
          } else {

            this.addTemplateConversation(1, this.defaultResponseText)
          }
        });
    }
  }

  private addTemplateConversation(type: number, text: String) {
    const newTemplateConversation: TemplateConversation = {
      type: type,
      text: text
    }
    this.conversations.push(newTemplateConversation)
  }

}
