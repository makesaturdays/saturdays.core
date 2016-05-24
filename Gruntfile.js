module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),


    bgShell: {
      install: {
        cmd: 'pyvenv-3.5 '+ __dirname +'/environment && source '+ __dirname +'/environment/bin/activate && pip install -r requirements.txt',
        bg: false,
        stdout: false
      },
      server: {
        cmd: 'source '+ __dirname +'/environment/bin/activate && python server.py',
        bg: false,
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
          "build/templates.js": ["saturdays/templates/_compile/**/*.hbs"]
        }
      }
    },



    sass: {
      compile: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
            'build/all.css': 'saturdays/styles/all.scss',
        }
      }
    },

    
    coffee: {
      compile: {
        files: {
          'build/app.js': [
            'saturdays/scripts/app.coffee',
            'saturdays/scripts/core/**/*.coffee',
            'saturdays/scripts/models/**/*.coffee',
            'saturdays/scripts/collections/**/*.coffee',
            'saturdays/scripts/views/**/*.coffee',
            'saturdays/scripts/routers/router.coffee']
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
        files: ['saturdays/styles/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: 'build/all.css'
      },
      coffee: {
        files: ['saturdays/scripts/**/*.coffee'],
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

  grunt.registerTask('install', ['bgShell:install']);
  grunt.registerTask('start', ['bgShell:server']);
  grunt.registerTask('compilers', ['handlebars', 'sass', 'coffee', 'open', 'watch']);
  grunt.registerTask('default', ['compilers']);

};



