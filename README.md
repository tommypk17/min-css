<h1>min-css</h1>
<p>This NodeJs package was created for fun & to learn a little more about the npm/nodejs package management process.</p>
<p>The purpose of the package is to minify css files, though it is rudimentary, it is helpful enough and gets a result that is close enough to suffice in a crunch.</p>
<h3>Project Structure</h3>
<p>min-css is a simple structure. Primary functionality can be found in the root index.js file.</p>
<hr/>
<h3>Installing</h3>
<p>As of now, this package is not hosted via npm.org. The github repo can be directly referenced when installing. Please find the install script below.</p>
<code>npm i --save-dev https://github.com/tommypk17/min-css</code>
<hr/>
<h3>Usage</h3>
<p>
To get started, after installation, the postinstall process should have setup a new script in the parent package.json file. This is primarily for ease of use and to reduce complex commands.
While inside the root of the project that needs css file minification, run the code below. This will create a brand new file with the same location and name, but with a .min.css extension.
</p>
<code>npm run css-min -- --path=./path/to/file.css</code>