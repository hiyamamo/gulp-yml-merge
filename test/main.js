require('mocha');
const should = require('should');
const assert = require('stream-assert');
const gulp = require('gulp');
const gutil = require('gulp-util');
const ymlMerge = require('../index');
const path = require('path');

describe('gulp-yml-merge', () => {
  context('isPriorSrc: true', () => {
    const result = `foo: foo
baz: baz
qux:
  a: a
  b: b
bar: bar
`;

    it('should merge yaml', done => {
      const stream = ymlMerge({
        targetPath: path.join(__dirname, 'fixtures/b.yml'),
        isPriorSrc: true
      });
      gulp.src(path.join(__dirname, 'fixtures/a.yml'))
        .pipe(stream)
        .pipe(assert.length(1))
        .pipe(assert.first(d => d.contents.toString().should.eql(result)))
        .pipe(assert.end(done))
    });
  });


  context('isPriorSrc: fasle', () => {
    const result = `foo: foo-foo
bar: bar
qux:
  b: b-b
baz: baz
`;

    it('should merge yaml', done => {
      const stream = ymlMerge({
        targetPath: path.join(__dirname, 'fixtures/b.yml'),
        isPriorSrc: false
      });
      gulp.src(path.join(__dirname, 'fixtures/a.yml'))
        .pipe(stream)
        .pipe(assert.length(1))
        .pipe(assert.first(d => d.contents.toString().should.eql(result)))
        .pipe(assert.end(done))
    });
  });
})
