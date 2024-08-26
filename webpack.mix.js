const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .react()  // if you are using React
    .sass('resources/sass/app.scss', 'public/css')
    .version(); // versioning for cache busting
