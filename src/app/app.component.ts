import { Component } from '@angular/core';
import { EmojiService } from './emoji.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public emojiService: EmojiService) {

  }

}
