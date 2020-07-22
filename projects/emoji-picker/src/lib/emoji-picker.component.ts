import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { EmojiPicker } from 'daily-emoji-picker';
import { EmojiMap, EmojiSourceFn } from 'daily-emoji-picker/dist/types';
import { EmojiData } from 'daily-emoji-picker/src/ts/types';

@Component({
  selector: 'lib-emoji-picker',
  template: `
    <div #container></div>
  `,
  styleUrls: ['../../../../node_modules/daily-emoji-picker/dist/picker.css']
})
export class EmojiPickerComponent<T extends EmojiMap> implements OnInit {
  @Input() source: EmojiSourceFn<T>;
  @Input() activeGroup?: string;
  @Output() onSelect: EventEmitter<EmojiData> = new EventEmitter<EmojiData>();
  @ViewChild('container') container: ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const emojiBlock = new EmojiPicker(this.container.nativeElement, {
        source: this.source,
        defaultActiveGroup: this.activeGroup,
        onSelect: this.onSelected
      });
      emojiBlock.init();
    });
  }

  onSelected(data: EmojiData): void {
    this.onSelect.emit(data);
  }

}
