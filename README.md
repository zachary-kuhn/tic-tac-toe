# tic-tac-toe
Provided is a tic-tac-toe web app with a computer opponent who cannot lose written using:

* Angular
* Lodash
* Browserify

There are two well known strategies for creating an unbeatable computer opponent for tic-tac-toe: minimax and the algorithm used in Newell and Simon's 1972 program.
Minimax is a generic decision rule using an algorithm to determine which move which minimizes the maximum loss.
Newell and Simon's is based on a priority order for tic-tac-toe moves.
I chose to implement Newell and Simon's algorithm because it gives more opportunity for design decisions.

## Dependencies

* Nodejs
* NPM
* Gulp

## Install

To install the application, issue the following commands in a terminal:

```
$ git clone https://github.com/zachary-kuhn/tic-tac-toe.git
$ cd tic-tac-toe
$ npm install
$ gulp build
```

## Running

After the install, you can run the service locally on port 3000 by running:

`$ node server`

A demo is also hosted on AWS at http://52.0.249.12/.
