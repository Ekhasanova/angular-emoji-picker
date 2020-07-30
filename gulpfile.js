const { src, dest, series } = require('gulp');

const base64 = require('gulp-base64');

function copyCss() {
  return src('node_modules/daily-emoji-picker/dist/*.css')
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: 8*40000,
    }))
    .pipe(dest('projects/emoji-picker/assets/'));
}

function copyImg() {
  return src('node_modules/daily-emoji-picker/dist/img/*.png')
    .pipe(dest('projects/emoji-picker/assets/img'));
}

exports.css_task = copyCss;
