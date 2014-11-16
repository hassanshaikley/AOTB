#HI GUYS

This is code for a multiplayer game written in JS. 

I plan to use MVC as well as better design patterns...and write more tests all in the near future! If you are a JS ninja please tell me what I can do better! [JS IS SO WEIRD]

Then after more of the foundation has been layed / framework for the game has been built then I plan on creating more art and adding more to the game.

If you have any tips please comment! Especially with respect to design patterns or using the database.

This project is still in a really early stage and has a lot of bugs that I am aware! [As well as a lot that I am not, I am sure!]

##Demo

Keys are w - a - s - d AND spacebar!

http://amara-staging.herokuapp.com 

##Running

Before running You need to have MongoDB.

Installation of MongoDB depends on your system. Look at the MongoDB documentation to learn how to install! 

If MongoDB is already installed, then simply clone and run.

    git clone https://hassanshaikley@bitbucket.org/hassanshaikley/amara-game.git && cd amara-game

    node web.js

Now go to localhost:5000 and enjoy!

##Alternatively, running it like a pro

Nodemon restarts the application after changes.

    npm install -g nodemon

    nodemon web.js

##Testing

Tests are written in Mocha

    npm install -g mocha.

Then simply run

    npm test
