#HI GUYS

This is code for a multiplayer game written in JS. 

If you have any tips please comment! Especially with respect to design patterns or using the database.

This project is still in an early stage and is buggy. Efficiently synchronizing with a server is challenging (and fun!).

##Demo

[Keys are w - a - s - d AND spacebar! ](http://amara-staging.herokuapp.com )

##Running

Before running the game locally, MongoDB must be installed and running.

If you need to, refer to MongoDB's docs for that one.  

Then simply clone and run.

    git clone https://hassanshaikley@bitbucket.org/hassanshaikley/amara-game.git && cd amara-game

    node web.js

Now head over to to localhost:5000 and enjoy!

##Testing

Tests are written in Mocha

    npm install -g mocha.

Then simply run

    npm test
