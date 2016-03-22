/*
 * 修改自 gulp-file-include 模块
 */

'use strict';

var concat = require('concat-stream'),
    merge = require('merge').recursive,
    es = require('event-stream'),
    gutil = require('gulp-util'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    config = require('../config');

module.exports = function(options) {

    //console.log(typeof options); object

    var prefix, basepath, filters, hashmap, context;

    if (typeof options === 'object') {
        basepath = options.basepath || '@file';
        prefix = options.prefix || '@@';
        hashmap = options.hashmap || {};
        context = options.context || {};
        filters = options.filters;
    } else {
        prefix = options || '@@';
        basepath = '@file';
        context = {};
    }
    // console.log(hashmap);
    var env = config.env;
    var staticPath = '';
    if(env === 'local'){
        staticPath = config.staticPath;
    }else{
        staticPath = config.publishStaticPath;
    }
    var js_path = staticPath + '/js/';
    var css_path = staticPath + '/css/';
    var hashLen = config.hashLength;
    var includeRegExp = new RegExp(prefix + 'include\\s*\\([^)]*["\'](.*?)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)+');

    function fileInclude(file) {
        var self = this;

        if (file.isNull()) {
            self.emit('data', file);
        } else if (file.isStream()) {
            file.contents.pipe(concat(function(data) {
                try {
                    self.emit('data', include(file, String(data)));
                } catch (e) {
                    self.emit('error', new gutil.PluginError('gulp-file-include', e.message));
                }
            }));
        } else if (file.isBuffer()) {
            try {
                file = include(file, String(file.contents));
                self.emit('data', file);
            } catch (e) {
                self.emit('error', new gutil.PluginError('gulp-file-include', e.message));
            }
        }
    }

    return es.through(fileInclude);

    /**
     * utils
     */
    function stripCommentedIncludes(content) {
        // remove single line html comments that use the format: <!-- @@include() -->
        var regex = new RegExp('<\!--(.*)' + prefix + 'include([\\s\\S]*?)-->', 'g');
        //console.log(content.replace(regex, ''));
        return content.replace(regex, '');
    }

    function parseConditionalIncludes(content, variables) {
        // parse @@if (something) { include('...') }
        var regexp = new RegExp(prefix + 'if.*\\{[^{}]*\\}\\s*'),
            matches = regexp.exec(content),
            included = false;

        var ctx = merge(true, context);
        merge(ctx, variables);
        if (!ctx.content) ctx.content = content;

        while (matches) {
            var match = matches[0],
                includeContent = /\{([^{}]*)\}/.exec(match)[1];

            // jshint ignore: start
            var exp = /if(.*)\{/.exec(match)[1];
            included = new Function('var context = this; with (context) { return ' + exp + '; }').call(ctx);
            // jshint ignore: end

            if (included) {
                content = content.replace(match, includeContent);
            } else {
                content = content.replace(match, '');
            }

            matches = regexp.exec(content);
        }

        return content;
    }

    function setLinks(type, str) {

        var _str = '';
        var tempArr = str.split(',');
        var cacheStr = String(new Date().getTime()).substr(0, hashLen);
        var _val, _name, _hash;
        for (var i = 0; i < tempArr.length; i++) {
            if (type.indexOf('css') === 0) {
                _val = tempArr[i];
                if (_.has(hashmap, _val) && env !== 'dev') {
                    _hash = hashmap[_val]['hash'].substr(0, hashLen);
                    _name = hashmap[_val].distname;
                } else {
                    _name = _val + "?v=" + cacheStr;
                }
                _str += '<link href="' + css_path + _name + '" rel="stylesheet" type="text/css">' + '\n';
            } else if (type.indexOf('js') === 0) {
                _val = tempArr[i];
                if (_.has(hashmap, _val) && env !== 'dev') {
                    _name = hashmap[_val].distname;
                } else {
                    _name = _val + "?v=" + cacheStr;
                }
                //如果是核心JS模块
                if(_val.indexOf('coreLibs') === 0 && config.env === 'local'){
                    _str += '<script src="' + config.coreJs.seaJs + '.js?t=' + cacheStr + '"></script>' + '\n';
                    _str += '<script src="' + config.coreJs.jquery + '.js?t=' + cacheStr + '"></script>' + '\n';
                    if(config.isOpenAvalon){
                        _str += '<script src="' + config.coreJs.avalon + '.js?t=' + cacheStr + '"></script>' + '\n';
                    }
                    _str += '<script>'+ config.seajsConfig +'</script>';

                }else if(_val.indexOf('coreLibs') === 0 && config.env !== 'local'){
                    _str += '<script src="' + config.coreJs.distCoreJs + config.coreJs.coreName + '?t=' + cacheStr + '"></script>' + '\n';
                    _str += '<script>'+ config.seajsConfig +'</script>';
                }else{
                    var _jsPath = '';
                    if(_val.indexOf('_') > -1){
                        _jsPath = _val.split('_').join('/').substr(0);
                    }else{
                        _jsPath = _val;
                    }
                    //发布环节
                    /*if(env !== 'local'){
                        _jsPath = _jsPath.replace(/[^\/]*[\/]+/g,'');
                        _str += '<script src="' + js_path + _jsPath + '?t=' + cacheStr + '"></script>' + '\n';
                        return false;
                    }*/
                    if(env !== 'local'){
                        _jsPath = _jsPath.replace(/[^\/]*[\/]+/g,'');
                    }
                    _str += '<script src="' + js_path + _jsPath + '?t=' + cacheStr + '"></script>' + '\n';
                }

            }
        };
        return _str;
    }

    function include(file, text) {
        text = stripCommentedIncludes(text);
        var variables = {};

        var filebase = basepath === '@file' ? path.dirname(file.path) : basepath === '@root' ? process.cwd() : basepath;
        var matches = includeRegExp.exec(text);


        //console.log(matches);

        filebase = path.resolve(process.cwd(), filebase);

        // for checking if we are not including the current file again
        var currentFilename = path.resolve(file.base, file.path);

        while (matches) {
            var match = matches[0];

            var includePath = path.resolve(filebase, matches[1]);

            if (currentFilename.toLowerCase() === includePath.toLowerCase()) {
                throw new Error('recursion detected in file: ' + currentFilename);
            }

            var includeContent = fs.readFileSync(includePath);

            // strip utf-8 BOM  https://github.com/joyent/node/issues/1918
            includeContent = includeContent.toString('utf-8').replace(/\uFEFF/, '');

            // need to double each `$` to escape it in the `replace` function
            includeContent = includeContent.replace(/\$/gi, '$$$$');

            // apply filters on include content
            if (typeof filters === 'object') {
                includeContent = applyFilters(includeContent, match);
            }

            var recMatches = includeRegExp.exec(includeContent);
            if (recMatches && basepath == '@file') {
                var recFile = new gutil.File({
                    cwd: process.cwd(),
                    base: file.base,
                    path: includePath,
                    contents: new Buffer(includeContent)
                });
                recFile = include(recFile, includeContent);
                includeContent = String(recFile.contents);
            }

            text = text.replace(match, includeContent);

            if (matches[3]) {
                // replace variables
                var data = JSON.parse(matches[3]);
                merge(variables, data);
                // grab keys & sort by longest keys 1st to iterate in that order
                var keys = Object.keys(data).sort().reverse();
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var val = data[key];
                    var links = (val === "") ? val : setLinks(key, val);
                    text = text.replace(new RegExp(prefix + key, 'g'), links ? links : val);
                }
            }

            matches = includeRegExp.exec(text);
        }

        text = parseConditionalIncludes(text, variables);

        file.contents = new Buffer(text);
        return file;
    }

    function applyFilters(includeContent, match) {
        if (match.match(/\)+$/)[0].length === 1) {
            // nothing to filter return unchanged
            return includeContent;
        }

        // now get the ordered list of filters
        var filterlist = match.split('(').slice(1, -1);
        filterlist = filterlist.map(function(str) {
            return filters[str.trim()];
        });

        // compose them together into one function
        var filter = filterlist.reduce(compose);

        // and apply the composed function to the stringified content
        return filter(String(includeContent));
    }
};

function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}
