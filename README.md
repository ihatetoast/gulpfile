# Gulp File:

from [Super simple Gulp tutorial for beginners](https://medium.freecodecamp.org/super-simple-gulp-tutorial-for-beginners-45141974bfe8) by Jessica Chan, for whose detailed but succinct tutorial I am incredibly grateful.

Trying to break my non-Gulp habit (because I'm such a laaaady) but need an annotated how-to until this becomes muscle memory. But man oh man, I'll miss saying "saskwatch" for sass watch.

These are all notes to me:

### Install ALL THE THINGS:

1. install gulp
2. install pkgs that compile sass, minify css, uglify js:

- gulp-sass — compiles your Sass files into CSS
- gulp-cssnano — minifies your CSS files
- gulp-concat — concatenates (combines) multiple JavaScript files into one large file
- gulp-uglify — minifies your JavaScript files
- npm install gulp-sass gulp-cssnano gulp-concat gulp-uglify

3. install gulp-cli (instead of running plain gulp globally) install --global gulp-cli

### Set up file structure:

- Root
  _ index.html
  _ gulpfile.js (THE SHIZZ)
  _ package.json
  _ node*modules (directory)
  * app (holds my scripts and styles. work here)
  _ js
  _ script.js
  \_ _possibleother.js _
  _ style.scss
  _ dist (stores the final compiled JavaScript and CSS files - do not work here)

### index.html

The index.html here has basic sticky footer with CSS Flexbox. If you want Grid or another way of making the footer sticky, you'll need to change it.

### Create & configure _gulpfile.js_:

- **At the top of your Gulpfile, add the modules like this:**

```var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
```

- **Basic gulp f(x):**

```
gulp.task('[Function Name]', function(){
   // Do stuff here
}
```

- **Main gulp f(x) used:** - .task() — Creates a task - .src() — where files come from. like babies. - .pipe() — adds a function to the Node stream that Gulp is using; you can pipe multiple functions in the same task. Code plumbing. - .dest() — sticks it where the dev don't shine - .watch() — self expl.

- **STDs: Sht to do. Not the syph.**

1. Sass task to compile SCSS to a CSS file and minify:

```
gulp.task('sass', function(){
   return gulp.src('app/style.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'));
});
```

2. JavaScript task to concatenate the JavaScript files and minify/uglify:

```
gulp.task('js', function(){
   return gulp.src('app/*.js') // * for all the js things
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});
```

**note:** `*.js` will compile alphabetically. Should the order be important, list them for manual compiling: `gulp.src(['app/script.js', 'app/script2.js'])`

```
gulp.task('js', function(){
   return gulp.src(['app/js/plugins/*.js', 'app/js/*.js'])
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});
```

3. Watch tasks for changes and re-run if necessary:

- Saskwatch:
  `gulp.watch('app/*.scss', ['sass']);`
- JS watch with globbing:
  `gulp.watch('app/js/**/*.js', ['js']);`
- All together hey:

```
gulp.task('watch', function(){
      gulp.watch('app/*.scss', ['sass']);
      gulp.watch('app/js/**/*.js', ['js']);
});
```

4. Create the default Gulp task

```
gulp.task('default', ['sass', 'js', 'watch']);
```

5. Reference all of this in the index.html:

`<link rel="stylesheet" href="dist/style.css">`

6. Add a script tag in the body:

`<script src="dist/all.js"></script>`

### Gulp!

- do it all with `gulp`
- do individual tasks with `gulp sass` or `gulp js` depending on the task name
