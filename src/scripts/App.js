const App = () => {
  const app = {};

  app.getBoardEl = () => {
    return document.getElementsByClassName("Board")[0];
  };
  app.getKeysEl = () => {
    return document.getElementsByClassName("Keys")[0];
  };

  app.guesses = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];
  app.keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
  ];

  app.renderBoardToDOM = () => {
    app.getBoardEl().innerHTML = app.guesses
      .map((word) => {
        return `
        <div class="Board__row">
            ${(() => {
              return word.reduce((html, letter) => {
                html += `<button class="Board__row__letter">${
                  letter || ""
                }</button>`;
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
                    html += `<button class="Keys__row__key">${key}</button>`;
                    return html;
                  }, "");
                })()}
            </div>
        `;
      })
      .join("");
  };

  app.init = () => {
    app.renderBoardToDOM();
    app.renderKeysToDOM();
  };
  return app;
};

export default App;
