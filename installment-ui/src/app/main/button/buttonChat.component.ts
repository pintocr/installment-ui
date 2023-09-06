import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

/**
 * @title Basic buttons
 */
@Component({
  selector: 'buttonChat',
  templateUrl: 'buttonChat.html',
  styleUrls: ['buttonChat.css'],
  standalone: true,

  imports: [
    MatButtonModule
  ]
})
export class buttonChat {}
