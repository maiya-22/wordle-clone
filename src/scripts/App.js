import words from "./words/index.js";

import canAddEventListeners from "./app-methods/event-listeners.js";
import canUpdateElements from "./app-methods/update-elements.js";
import canGetElements from "./app-methods/get-elements.js";
import canGetWord from "./app-methods/get-word.js";
import canRenderHTML from "./app-methods/render-html.js";
import canGuess from "./app-methods/guess";
const App = () => {
  const app = {};
  app.state = {
    word: null,
    guesses: null,
    keys: null,
    round: 0,
    position: 0,
  };

  app.setState = (params) => {
    Object.keys(params).forEach((param) => {
      app.state[param] = params[param];
    });
    console.log("state:", app.state);
  };

  canUpdateElements(app);
  canGetElements(app);
  canGetWord(app);
  canRenderHTML(app);
  canGuess(app);
  canAddEventListeners(app);

  app.words = words;

  app.getGuesses = () => {
    return (
      app.state.guesses || [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ]
    );
  };

  app.keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
  ];

  app.keysHash = app.keys.reduce((hash, row) => {
    row.forEach((letter) => {
      hash[letter] = {
        letter,
        status: null,
      };
    });
    return hash;
  }, {});

  app.init = () => {
    app.setState({
      guesses: app.getGuesses(),
      keys: app.keys,
      keysHash: app.keysHash,
    });
    app.getRandomWord();
    app.renderBoardToDOM();
    app.renderKeysToDOM();
    app.addEventListeners();
  };
  return app;
};

export default App;
