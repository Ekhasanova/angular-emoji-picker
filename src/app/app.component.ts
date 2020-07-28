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
  @ViewChild('pickerComponent') pickerComponent: EmojiPickerComponent<EmojiMap>;

  private emojiInited = false;

  constructor(public emojiService: EmojiService) {}

  get element(): HTMLElement {
    return this.container.nativeElement;
  }

  ngOnInit(): void {}

  onOutsideClick() {
    if (this.emojiInited) {
      this.pickerComponent.callEmojiBlockAction('hide');
    }
  }

  onClick() {
    if (!this.emojiInited) {
      this.pickerComponent.callEmojiBlockAction('render', this.container.nativeElement);
      this.emojiInited = true;
    }
    this.pickerComponent.callEmojiBlockAction('show');
  }

}
