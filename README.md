# gulp-yml-merge
Gulp plugin merge yaml

# Install
```sh
npm install --save-dev gulp-yml-merge
```

# Usage
```javascript
/* gulpfile.js */
const gulp = require('gulp');
const ymlMerge = require('gulp-yml-merge');

gulp.task('merge', () => {
  gulp.src('a.yml')
    .pipe(ymlMerge('b.yml'))
    .pipe(gulp.dest('./dist'))
});
```
