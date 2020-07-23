import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// TODO CHANGE TO npm package name
import { EmojiPickerModule } from 'projects/emoji-picker/src/lib/emoji-picker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmojiPickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
