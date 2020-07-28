const { src, dest, series } = require('gulp');

function copyCss() {
  return src('node_modules/daily-emoji-picker/dist/*.css')
    .pipe(dest('projects/emoji-picker/assets/'));
}

function copyImg() {
  return src('node_modules/daily-emoji-picker/dist/img/*.png')
    .pipe(dest('projects/emoji-picker/assets/img'));
}

exports.css_task = series(copyCss, copyImg);
