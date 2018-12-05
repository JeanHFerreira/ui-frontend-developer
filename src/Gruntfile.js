module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      inicio: ['build/**']
    },
    copy: {
      arquivos: {
        src: [
          '**/*',
          '!app/**',
          '!package.json',
          '!package-lock.json',
          '!Gruntfile.js',
          '!pages/**',
          '!node_modules/**',
        ],
        dest: 'build',
        expand: true
      }
    },
    concat: {
      options: {
        separator: '\n'
      },
      modulos: {
        src: [
          'app/*.js',
          'pages/**/*.js'
        ],
        dest: 'build/teste-pratico.min.js'
      }
    },
    uglify: {
      options: {
        banner: "/*! teste-pratico <%= grunt.template.today('dd-mm-yyyy') %> */\n"
      },
      dist: {
        files: [{
          "<%= concat.modulos.dest %>": ["<%= concat.modulos.dest %>"]
        }]
      }
    },
    processhtml: {
      build: {
        files: {
          "build/index.html": ["index.html"]
        }
      }
    },
  });

  // Load the plugin that provides the 'uglify' task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:inicio',
    'copy:arquivos',
    'concat:modulos',
    'uglify',
    'processhtml'
  ]);

};