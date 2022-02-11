import words from "./words/index.js";

const App = () => {
  const app = {};

  app.state = {
    word: null,
    guesses: null,
    round: 0,
    position: 0,
  };

  app.setState = (params) => {
    Object.keys(params).forEach((param) => {
      app.state[param] = params[param];
    });
    console.log("state:", app.state);
  };

  app.words = words;

  app.updateBoardEls = () => {
    app.getBoardLetterEls().forEach((el) => {
      let column = Number(el.dataset.column);
      let row = Number(el.dataset.row);
      let guess = app.state.guesses[row][column];
      if (guess && guess.status === "exact") {
        el.classList.add("exact");
        el.innerHTML = app.state.word[column];
      }
    });
  };

  app.getRandomWord = () => {
    let wordKeys = Object.keys(app.words);
    let randomIndex = Math.floor(Math.random() * wordKeys.length);
    app.setState({ word: wordKeys[randomIndex] });
  };

  app.getBoardLetterEls = () => {
    return Array.from(document.getElementsByClassName("Board__row__letter"));
  };
  app.getBoardEl = () => {
    return document.getElementsByClassName("Board")[0];
  };
  app.getKeysEl = () => {
    return document.getElementsByClassName("Keys")[0];
  };

  app.getKeyEls = () => {
    return Array.from(document.getElementsByClassName("Keys__row__key"));
  };

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

  app.handleGuessLetter = (e) => {
    if (app.state.position >= app.state.word.length) {
      console.warn("to do: next round");
      return null;
    }
    let { letter } = e.target.dataset;
    let result, exactMatch, almostMatch, noMatch, nextGuesses;
    exactMatch = app.state.word[app.state.position] === letter;
    if (!exactMatch) {
      almostMatch = app.state.word.split("").includes(letter);
    }
    noMatch = !exactMatch;

    result = exactMatch ? "exact" : almostMatch ? "almost" : "none";
    let guess = {
      round: app.state.round,
      position: app.state.position,
      letter: letter,
      status: result,
    };
    nextGuesses = app.state.guesses;
    nextGuesses[app.state.round][app.state.position] = guess;

    app.setState({
      position: app.state.position + 1,
      guesses: nextGuesses,
    });
    app.updateBoardEls();
  };
  app.handleGuessWord = (e) => {};

  app.renderBoardToDOM = () => {
    app.getBoardEl().innerHTML = app.state.guesses
      .map((word, i) => {
        return `
        <div class="Board__row">
            ${(() => {
              return word.reduce((html, letter, k) => {
                html += `<button 
                            class="Board__row__letter" 
                            data-column="${k}"
                            data-row="${i}"
                            data-letter="${letter}">${
                  letter || ""
                }- col: ${k} row: ${i}</button>`;
                return html;
              }, "");
            })()}
        </div>
        `;
      })
      .join("");
  };

  app.renderKeysToDOM = () => {
    app.getKeysEl().innerHTML = app.keys
      .map((row) => {
        return `
            <div class="Keys__row">
                ${(() => {
                  return row.reduce((html, key) => {
                    html += `<button class="Keys__row__key" data-letter="${key}">${key}</button>`;
                    return html;
                  }, "");
                })()}
            </div>
        `;
      })
      .join("");
  };

  app.addEventListeners = () => {
    app.getKeyEls().forEach((el) => {
      el.addEventListener("click", app.handleGuessLetter);
    });
  };

  app.init = () => {
    app.setState({ guesses: app.getGuesses() });
    app.getRandomWord();
    app.renderBoardToDOM();
    app.renderKeysToDOM();
    app.addEventListeners();
  };
  return app;
};

export default App;
