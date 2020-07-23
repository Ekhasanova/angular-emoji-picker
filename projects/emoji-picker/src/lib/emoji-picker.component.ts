import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { EmojiPicker } from 'daily-emoji-picker';
import { EmojiMap, EmojiSourceFn } from 'daily-emoji-picker/dist/types';
import { EmojiData } from 'daily-emoji-picker/src/ts/types';

@Component({
  selector: 'lib-emoji-picker',
  template: `
    <div #container></div>
  `,
  styleUrls: ['../styles/picker.css']
})
export class EmojiPickerComponent<T extends EmojiMap> implements OnInit {
  @Input() source: EmojiSourceFn<T>;
  @Input() activeGroup?: string;
  @Output() onSelect: EventEmitter<EmojiData> = new EventEmitter<EmojiData>();
  // TODO Контейнер лучше передавать в компонент
  @ViewChild('container') container: ElementRef;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      // 1 - Инициализацию надо делать - но не рендерить
      // 2 - ссылку на EmojiPicker надо сохранить как поле компонента
      // чтобы можно было вызывать его методы
      // Например, передали контейнер, навесили клик на кнопку
      // В обработчике кнопки, вызвали поповер получили ссылку на пикер отренедерили там виджет

      // В итоге надо все это упоковать в библиотеку - чтобы она сама вызывала поповер, а в проект мы просто добавляли
      // Компонент который рендерит кнопку, по клику на которую в CDK поповере рендерится виджет
      const emojiBlock = new EmojiPicker(this.container.nativeElement, {
        source: this.source,
        defaultActiveGroup: this.activeGroup,
        onSelect: this.onSelected.bind(this)
      });
      emojiBlock.init();
    });
  }

  onSelected(data: EmojiData): void {
    this.onSelect.emit(data);
  }

}
