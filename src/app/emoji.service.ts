import { Injectable } from '@angular/core';
import autobind from 'autobind-decorator'
import emojiMockData from '../assets/emoji-stub.json';
import { of } from 'rxjs';
import { EmojiMap, EmojiData } from 'daily-emoji-picker/src/ts/types';


export interface Emoji {
    name: string;
    group: string;
    relative_path: string;
    url: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  constructor() { }

  @autobind
  public getMockedData(): Promise<EmojiMap> {
    return of(this.map(emojiMockData)).toPromise();
  }

  private map(emojiArray: Emoji[]): EmojiMap {
    const _map = {};
    for (let i = 0; i < emojiArray.length; i++) {
      const emoji = emojiArray[i];
      const { group } = emoji;
      emoji.relative_path = emoji.url;
      if (!_map[group]) {
        _map[group] = [];
      }
      _map[group].push(emoji);
    }
    return _map;
  }

  public onSelected(record: EmojiData) {
    console.log(record);
  }

}
