import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmojiPicker } from 'daily-emoji-picker';
import { EmojiMap, EmojiSourceFn } from 'daily-emoji-picker/dist/types';
import { EmojiData } from 'daily-emoji-picker/src/ts/types';

@Component({
  selector: 'lib-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.css', '../../assets/picker.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmojiPickerComponent<T extends EmojiMap> implements OnInit {
  @Input() source: EmojiSourceFn<T>;
  @Input() activeGroup?: string;
  @Input() container: ElementRef;
  @Input() button: HTMLElement;

  @Output() selectHandler: EventEmitter<EmojiData> = new EventEmitter<EmojiData>();

  @ViewChild('defaultCtnr') defaultCtnr: ElementRef;
  @ViewChild('defaultBtn') defaultBtn: ElementRef;

  get containerEl() {
    if (this.container) {
      return this.container;
    }
    return this.defaultCtnr.nativeElement;
  }

  private emojiPicker: EmojiPicker<EmojiMap>;
  private rendered = false;

  constructor(private ngZone: NgZone) { }

  private onSelected(data: EmojiData): void {
    this.selectHandler.emit(data);
  }

  private setEmojiBlock() {
    this.ngZone.runOutsideAngular(() => {
      this.emojiPicker = new EmojiPicker({
        source: this.source,
        defaultActiveGroup: this.activeGroup,
        onSelect: this.onSelected.bind(this)
      });
      this.emojiPicker.init();
    });
  }

  private setListeners() {
    if (this.button) {
      this.button.addEventListener('click', this.showPicker.bind(this));
    }
  }

  public showPicker(): void {
    if (!this.rendered) {
      this.callEmojiBlockAction('render');
      this.rendered = true;
    }
    this.callEmojiBlockAction('show');
  }

  public hidePicker(): void {
    this.callEmojiBlockAction('hide');
  }

  public callEmojiBlockAction(action: string, args?: any[]) {
    if (this.emojiPicker[action]) {
      if (action === 'render') {
        args = [this.containerEl];
      }
      this.ngZone.runOutsideAngular(() => {
        this.emojiPicker[action].apply(this.emojiPicker, args);
      });
    }
  }

  ngOnInit() {
    this.setEmojiBlock();
    this.setListeners();
  }

}
