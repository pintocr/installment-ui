import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  formName: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formName = this.fb.group({
      name: ['test']
    });
  }

  ngOnInit() {
    this.formName.controls['name'].setValue("Some Example");
  /* this.formName = this.fb.group({
     name: new FormControl('')
   });*/
 }
}
