import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-field-for-chat',
  styleUrls: ['inputFieldForChat.css'],
  templateUrl: 'inputFieldForChat.html',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
})
export class InputFieldForChat {}
