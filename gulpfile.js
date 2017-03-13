var gulp = require('gulp'),
    del = require("del"),
    runSequence = require('run-sequence'),// 确保任务顺序执行;
    less = require('gulp-less'),// less转css
    minifycss = require('gulp-minify-css'),// 压缩css
    uglify = require('gulp-uglify'),// 压缩js
    rename = require('gulp-rename'), // 重命名
    concat = require("gulp-concat");// 合并
// gulp.task("copy", function () {
//     return gulp.src("css/*").pipe(gulp.dest("csss"));
// });
/*删除数据*/
gulp.task("del", function () {
    return del("mini/*");
});
/*less转css*/
gulp.task("less", function () {
    return gulp.src("otherPage/css/*").pipe(less()).pipe(gulp.dest("css"));
})
// 压缩css
gulp.task("minifycss", function () {
    return gulp.src("otherPage/css/*").pipe(minifycss()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest("mini/css"));
})
// 压缩js
gulp.task("uglify", function () {
    return gulp.src("otherPage/js/*").pipe(uglify()).pipe(rename(function (path) {
        path.basename += "20170219233348.min";
    })).pipe(gulp.dest("mini/js"));
})
// 合并
gulp.task("concat", function () {
    gulp.src("mini/js/*").pipe(concat("20170219233348-v1.01.js")).pipe(gulp.dest("mini/js"))
});
gulp.task('default', function (callback) {
    runSequence('del', 'less', ["minifycss", "uglify"], "concat");
    // runSequence('del',"uglify");
});
