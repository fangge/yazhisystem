module.exports = function(grunt) {
    var formatDate = function(now){
        if (now) {
            now = new Date(parseInt(now))
        } else {
            now = new Date()
        }
        var year = now.getFullYear(),
            month = now.getMonth() + 1,
            day = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();

        if ((month + "").length === 1) month = "0" + month;

        if ((day + "").length === 1) day = "0" + day;

        if ((hour + "").length === 1) hour = "0" + hour;

        if ((minute + "").length === 1) minute = "0" + minute;

        if ((second + "").length === 1) second = "0" + second;

        return {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        }
    }
    var dateObj = formatDate();
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //清除目录
        clean:{
            build:['build','.build'],
            css:['build/css/*','!build/css/main.css'],
            js:['build/js/bootstrap.min.js','build/js/jquery.js']
        },
        // 文件合并
        concat: {
            options: {
                //separator: ';',
                stripBanners: true
               },
            css:{
                src: ["build/css/*.css"],
                 dest: "build/css/main.css"
                 },
            js:{
                src: ["build/js/jquery.js","build/js/bootstrap.min.js"],
                dest: "build/js/base.js"
            }
        },
        //js压缩
        uglify: {
            options: {
                banner: '/*! \n<%= pkg.name %>\n @version: <%= pkg.version %> \n @author: <%= pkg.author %> \n @build: <%= grunt.template.today("yyyy-mm-dd") %>  '+dateObj.hour+":"+dateObj.minute+":"+dateObj.second+'\n*/\n'
            },
            my_target: {
                files:[{
                    expand:true,
                    cwd:'build/',
                    src:['**/*.js','!**/com.js'],
                    dest:'build/'
                }]
            }
        },
       //复制未处理的静态资源文件
        copy:{
            main:{ 
                expand: true,
                cwd: 'trunk/',
                src: ['**', '!**/*.scss','!**/*less','!modules/{,*/}*','!img/sprite/{,*/}*','!init/{,*/}*','!img/psd','!img/psd/{,*/}*'],
                dest: 'build/'
            }
        },
        imagemin:{
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'build/img',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,jpeg,gif}','!**/sprite'],   // Actual patterns to match
                    dest: 'build/img'                  // Destination path prefix
                }]
            }
        },
        cssmin: {
            options: {
                compatibility : 'ie8', //设置兼容模式
                noAdvanced : true //取消高级特性
            },
            minify: {
                expand: true,
                cwd: 'build/css',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css',
                ext: '.css'
            }
        },
        //替换时间戳，防止静态资源的缓存
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'timestamp',
                            replacement: '<%= new Date().getTime() %>'
                        }
                    ]
                },
                files: [
                    {expand: true, cwd:'build/', src: ['**/*.html'], dest: 'build/'},
                ]
            }
        },

        // 处理html中css、js 引入合并问题
         usemin: {
        html: 'build/*.html'
        }

    });

    // 加载任务插件
    grunt.registerTask('build',
        [
            'clean',
            'copy',
            'imagemin',
            'concat:js',
            'clean:js',
            'uglify',
            'concat:css',
            'clean:css',
            'cssmin',
            'usemin',
            'replace'
        ]);
};
