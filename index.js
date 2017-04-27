/**
 * gulp-yml-merge
 *
 * @param {object} options
 * @param {string} options.targetPath - path to target yaml
 * @param {boolean} options.isPriorSrc - whether to prioritize src yaml(Default: false)
*/
const yaml = require('js-yaml');
const fs = require('fs');
const through = require('through2');
const gutil = require('gulp-util')
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-yml-merge';

const merge = (a, b) => {
  const objA = yaml.safeLoad(a)
  const objB = yaml.safeLoad(b)
  const data = yaml.safeDump(Object.assign({}, objA, objB))
  return new Buffer(data)
};

module.exports = ({ targetPath, isPriorSrc = false }) => {
  if (!targetPath) {
    throw new PluginError(PLUGIN_NAME, 'Missing targetPath!');
  }

  if (typeof targetPath !== 'string') {
    throw new PluginError(PLUGIN_NAME, 'TargetPath should be String!');
  }

  return through.obj(function(file, encoding, callback) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));;
      return cb();
    }
    try {
      const targetFile = fs.readFileSync(targetPath, 'utf8');
      let data;
      if (isPriorSrc) {
        data = merge(targetFile, file.contents);
      } else {
        data = merge(file.contents, targetFile);
      }
      const output = file.clone({ contents: false });
      output.contents = data;
      this.push(output);
    } catch(e) {
      this.emit('error', new PluginError(PLUGIN_NAME, e.message));;
    }
    callback();
  })
};
