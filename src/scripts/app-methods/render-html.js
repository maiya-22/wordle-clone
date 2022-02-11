export default (app) => {
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
                      letter || "x"
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
                        html += `<button class="Keys__row__key" data-letter="${key}">${key}</button>`;
                        return html;
                      }, "");
                    })()}
                </div>
            `;
      })
      .join("");
  };
};
