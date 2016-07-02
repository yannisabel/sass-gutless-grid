# SASS Gutless Grid

## Demo

If you don't have the time to read or if you like a good example before starting like me you can check demos on [Codepen](http://codepen.io/graphyzart/pen/BKQaEY "Codepen Gutless Grid Demos").

## Step by step

You need to follow this steps to run the web directory with a Node server.

* 1\. Install Gulp
* 2\. Getting Started


## 1\. Install Gulp

To compile my [SASS](http://sass-lang.com/ "SASS official website") files into CSS files I used [Gulp](http://gulpjs.com/ "Gulpjs") with [gulp-sass](https://www.npmjs.com/package/gulp-sass "gulp-sass on NPM official website") package.

If you already know how to install gulp to compile your SASS just clone or fork the repository.

First you need to install [Node.js](https://nodejs.org/en/ "officiel Nodejs website") on your computer. Then open a terminal (Your favorite terminal will be perfect), and now go to the directory base with the following command:

`cd path/to/the/directory/gulp-workflow`

Here, you can install [NPM](https://www.npmjs.com/ "npmjs official website")(Node Package Manager) dependancies.

Run this command:

`npm install`

It installs all dependancies found in the `package.json`.

You need to install gulp globally with this command:

`npm install gulp -g`

Then just run the following command line:

`gulp`

It executes the default task and launch the server.
I think it's better to show you this grid in action. So the `index.html` is a kind of documentation and the `demo.html` is the demos page.

If you want to go further with Gulp or if you don't know how it works you can check my [Gulp workflow with SASS and Jade](https://github.com/yannisabel/gulp-workflow "Gulp Workflow with SASS and JADE").

## 2\. What's Gutless Grid ?

**SASS Gutless Grid** is a grid System in 4 parts :

*   Grid with gutter
*   Grid without gutter (I like to call it **Gutless**)
*   Grid with offset capacity
*   And finally the **Gutless Grid** with offset capacity

All this methods can be mixed and added to a framework with an other grid system. This grid was made in one purpose: the challenge (and I think I wanted to have my own grid system too). No pressure, just for fun! To do it I have created different mixins with **SASS** to generate classes, just like Bootstrap.

You can find a mixin for responsive breakpoints too. It's easier to manage the grid with it, and you can easily change the breakpoints values.
Default value :
<pre>// Small screen
$break-small: 'max-width:767px';
// Medium screen
$break-medium: 'min-width:768px';
// large screen
$break-large: 'min-width:960px';
// Extra large screen
$break-wide: 'min-width:1200px';
</pre>
