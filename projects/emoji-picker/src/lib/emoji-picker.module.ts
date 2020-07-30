import { NgModule } from '@angular/core';
import { EmojiPickerComponent } from './emoji-picker.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [ BrowserModule, ClickOutsideModule],
  declarations: [ EmojiPickerComponent ],
  exports: [ EmojiPickerComponent ]
})
export class EmojiPickerModule { }
