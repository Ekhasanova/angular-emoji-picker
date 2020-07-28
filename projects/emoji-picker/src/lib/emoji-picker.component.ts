import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmojiPicker } from 'daily-emoji-picker';
import { EmojiMap, EmojiSourceFn } from 'daily-emoji-picker/dist/types';
import { EmojiData } from 'daily-emoji-picker/src/ts/types';

@Component({
  selector: 'lib-emoji-picker',
  template: '',
  styleUrls: ['../../assets/picker.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmojiPickerComponent<T extends EmojiMap> implements OnInit {
  @Input() source: EmojiSourceFn<T>;
  @Input() activeGroup?: string;
  @Output() selectHandler: EventEmitter<EmojiData> = new EventEmitter<EmojiData>();

  private emojiBlock: EmojiPicker<EmojiMap>;

  constructor(private ngZone: NgZone) { }

  private onSelected(data: EmojiData): void {
    this.selectHandler.emit(data);
  }

  private setEmojiBlock() {
    console.log(this.source);
    this.ngZone.runOutsideAngular(() => {
      this.emojiBlock = new EmojiPicker({
        source: this.source,
        defaultActiveGroup: this.activeGroup,
        onSelect: this.onSelected.bind(this)
      });
      this.emojiBlock.init();
    });
  }

  public callEmojiBlockAction(action: string, parameter?: any) {
    console.log(this.emojiBlock);
    if (this.emojiBlock[action]) {
      this.ngZone.runOutsideAngular(() => {
        this.emojiBlock[action](parameter);
      });
    }
  }

  ngOnInit() {
    this.setEmojiBlock();
  }

}
