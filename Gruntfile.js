module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),


    bgShell: {
      python: {
        cmd: 'source '+ __dirname +'/environment/bin/activate && python server.py',
        bg: true,
        stdout: false
      }
    },


    handlebars: {
      compile: {
        options: {
          namespace: "templates",
          processContent: function(content, filepath) {
            content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
            content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
            return content;
          },
          processName: function(filePath) {
            var name = "";
            filePath = filePath.split(".");
            filePath = filePath[0].split("/");
            name += filePath[3];
            for (var i = 4; i < filePath.length; i++) {
                name += "/" + filePath[i];
            };
            return name;
          }
        },
        files: {
          "saturdays/build/templates.js": ["saturdays/source/hbs/**/*.hbs"]
        }
      }
    },



    sass: {
      compile: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
            'saturdays/build/all.css': 'saturdays/source/scss/all.scss',
        }
      }
    },

    
    coffee: {
      compile: {
        files: {
          'saturdays/build/app.js': [
            'saturdays/source/coffee/app.coffee',
            'saturdays/source/coffee/core/**/*.coffee',
            'saturdays/source/coffee/models/**/*.coffee',
            'saturdays/source/coffee/collections/**/*.coffee',
            'saturdays/source/coffee/views/**/*.coffee',
            'saturdays/source/coffee/routers/router.coffee']
        }
      }
    },

    open: {
      start: {
        path: 'http://localhost:5000',
        app: 'Google Chrome'
      }
    },

    watch: {
      options: {
        livereload: {
          host: 'localhost',
          port: 9000
        }
      },
      html: {
        files: ['saturdays/templates/**/*.html']
      },
      handlebars: {
        files: ['saturdays/source/hbs/**/*.hbs'],
        tasks: ['handlebars']
      },
      sass: {
        options: {
          livereload: false
        },
        files: ['saturdays/source/scss/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: 'saturdays/build/all.css'
      },
      coffee: {
        files: ['saturdays/source/coffee/**/*.coffee'],
        tasks: ['coffee']
      }
    }


  });


  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('start', ['bgShell', 'handlebars', 'sass', 'coffee', 'open', 'watch']);
  grunt.registerTask('default', ['handlebars', 'sass', 'coffee', 'open', 'watch']);

};



