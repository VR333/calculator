I assume that you have NodeJs and npm installed.
So you need only webpack and webpack-dev-server.
just enter following command to install webpack:
     npm i -g webpack
Enter following command to install webpack-dev-server:
     npm i -g webpack-dev-server

This will install webpack and webpack-dev-server globally due to -g flag.

Next thing to do is navigate to the folder with a project in command line and run following commands:
1. npm run build (actually no need to do this, just for insurance)
The output will be like this:
C:\Users\rvakh\Desktop\calculator>webpack
Hash: 3f58a41ea1b9ebd45d1e
Version: webpack 3.10.0
Time: 474ms
    Asset     Size  Chunks                    Chunk Names
bundle.js  1.29 MB       0  [emitted]  [big]  main
   [0] ./app/app.js 548 bytes {0} [built]
   [2] ./app/directives/calc-wrapper/calc-wrapper.js 626 bytes {0} [built]
   [3] ./app/directives/calc-display/calc-display.js 331 bytes {0} [built]
   [4] ./app/directives/calc-keyboard/calc-keyboard.js 339 bytes {0} [built]
   [5] ./app/directives/button/button.js 2.96 kB {0} [built]
    + 1 hidden module

2. npm run watch
3. npm run start (this will run server locally on 8080 port by default). So then you need only browser to view a page.
