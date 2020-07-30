import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmojiService } from './emoji.service';
import { EmojiMap } from 'daily-emoji-picker/dist/types';
import { EmojiPickerComponent } from 'emojiPicker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('button') button: ElementRef;
  @ViewChild('pickerComponent') pickerComponent: EmojiPickerComponent<EmojiMap>;

  constructor(public emojiService: EmojiService) {}

  ngOnInit(): void {}

  onOutsideClick() {
    this.pickerComponent.callEmojiBlockAction('hide');
  }

}
