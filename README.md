# AOTB, a multiplayer game written in JavaScript

The server is authoritative and key presses are handled on the server.

[Demo](http://aotb.io )

##Running

Before running the game locally, MongoDB must be installed and running.

If you need to, refer to MongoDB's docs for that one.  

Then simply clone and run.

    >> git clone https://hassanshaikley@bitbucket.org/hassanshaikley/amara-game.git && cd amara-game
    >> npm install #requires npm
    >> cd Backened
    >> node server.js

Now head over to to localhost:5000 and enjoy!

##Testing

Tests are written in Mocha

    npm install -g mocha.

For serverside tests simply go to the server directory and run

    npm test

For clientside tests simply go to http://localhost:5000/test
