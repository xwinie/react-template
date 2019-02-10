var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    webpack = require("webpack"),
    webpackDevServer = require("webpack-dev-server"),
    webpackDevConfig = require("./webpack.dev.config.js"),
    webpackProductionConfig = require("./webpack.production.config.js"),
    gutil = require('gulp-util'),
    babel = require('babel-core/register'),
    mocha = require('gulp-mocha'),
    port = 3000,
    open = require('open'),
    stubby = require('gulp-stubby-server'),
    nodemon = require('gulp-nodemon');

let url = "http://127.0.0.1:8001";
let options = {
    target: url,
    changeOrigin: true,
    ws: true,
    proxyTimeout:10000
};

gulp.task('poxyServer', function () {
    nodemon({
        script: 'server.js'
    });
});

gulp.task("webpack:server", function (callback) {

    // modify some webpack config options
    var myConfig = Object.create(webpackDevConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;

    // Start a webpack-dev-server
    var server = new webpackDevServer(webpack(myConfig), {
        //noInfo: true,
        //watch: true,
        historyApiFallback: true,
        contentBase: './dist',
        hot: true,
        progress: true,
        open: true,
        stats: {
            colors: true
        },
        noInfo: true,//  will disable informational messages unless there's an error.
        proxy: {'/api/*': options}
    });

    server.listen(port, "0.0.0.0", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:" + port);
        gulp.start('openBrowser');
    });

});

gulp.task('mockServer', function (cb) {
    var options = {
        callback: function (server, options) {
            server.get(1, function (err, endpoint) {
                if (!err)
                    console.log(endpoint);
            });
        },
        stubs: 8000,
        tls: 8443,
        admin: 8010,
        files: [
            'mocks/*.{json,yaml,js}'
        ]
    };
    stubby(options, cb);
});


gulp.task("build", ['test', 'html','copy'], function () {
    // run webpack
    webpack(webpackProductionConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack:errors]", stats.compilation.errors.toString({
            colors: true
        }));
        gutil.log("[webpack:warnings]", stats.compilation.warnings.toString({
            colors: true
        }));
        console.log('webpack compile success.');
    });
});

gulp.task('unit_test', function () {
    return gulp.src('./test/unit_tests/**/*.spec.js', {read: false})
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }))
        .once('end', function () {
            gulp.start('end2end_test');
        });
});

gulp.task('end2end_test', function () {
    return gulp.src('./test/end2end_tests/**/*.spec.js', {read: false})
        .pipe(mocha({
            timeout: 5000,
            compilers: {
                js: babel
            }
        }));
});


gulp.task('openBrowser', function () {
    open('http://localhost:' + port, function (err) {
        if (err) throw err;
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['test']);
    gulp.watch('./src/js/**/*.jsx', ['test']);
});

gulp.task('copy',function(){
    gulp.src('server.js')
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('dev', ['default']);
gulp.task('test', ['unit_test','end2end_test']);
gulp.task('default', ['poxyServer','webpack:server', 'watch']);