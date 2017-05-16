[![npm version](https://badge.fury.io/js/gulp-yml-merge.svg)](https://badge.fury.io/js/gulp-yml-merge)

# gulp-yml-merge
Gulp plugin merge yaml

# Install
```bash
npm install --save-dev gulp-yml-merge
```

# Usage
```javascript
/* gulpfile.js */
const gulp = require('gulp');
const ymlMerge = require('gulp-yml-merge');

gulp.task('merge', () => {
  gulp.src('a.yml')
    .pipe(ymlMerge({
      targetPath: 'b.yml',
      isPriorSrc: true
    }))
    .pipe(gulp.dest('./dist'))
});
```

```yaml
# a.yml
foo: foo
bar: bar
qux:
  a: a
  b: b
```

```yaml
# b.yml
foo: foo-foo
baz: baz
qux:
  b: b-b
```

```yaml
# dist/a.yml
foo: foo
baz: baz
qux:
  a: a
  b: b
bar: bar
```
