module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),


    bgShell: {
      install: {
        cmd: 'python3.6 -m venv '+ __dirname +'/environment && source '+ __dirname +'/environment/bin/activate && pip install -r requirements.txt',
        bg: false,
        stdout: false
      },
      server: {
        cmd: 'source '+ __dirname +'/environment/bin/activate && python server.py',
        bg: false,
        stdout: false
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

    open: {
      start: {
        path: 'http://localhost:8080',
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
      sass: {
        options: {
          livereload: false
        },
        files: ['saturdays/styles/**/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: 'build/all.css'
      }
    }


  });


  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('install', ['bgShell:install']);
  grunt.registerTask('start', ['bgShell:server']);
  grunt.registerTask('compilers', ['open', 'watch']);
  grunt.registerTask('default', ['compilers']);

};



