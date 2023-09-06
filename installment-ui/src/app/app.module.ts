import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './main/chat/chat.component';
import {buttonChat} from "./main/button/buttonChat.component";
import {InputFieldForChat} from "./main/inputField/inputFieldForChat";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    buttonChat,
    InputFieldForChat
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
