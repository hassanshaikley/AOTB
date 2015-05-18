#HI GUYS

This is code for a multiplayer game written in JS. 

The server is authoritative and all key presses are handled on the server.

If you have any tips please comment! Especially with respect to design patterns or using the database.

##Demo

[Keys are w, a, s, d & right click! ](http://amara-staging.herokuapp.com )

##Running

Before running the game locally, MongoDB must be installed and running.

If you need to, refer to MongoDB's docs for that one.  

Then simply clone and run.

    git clone https://hassanshaikley@bitbucket.org/hassanshaikley/amara-game.git && cd amara-game
    npm install #requires npm
    node web.js #nodemon if you are cool tho

Now head over to to localhost:5000 and enjoy!

##Testing

Tests are written in Mocha

    npm install -g mocha.

Then simply run

    npm test


