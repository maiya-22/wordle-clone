export default (app) => {
  app.updateBoardEls = () => {
    app.getBoardLetterEls().forEach((el) => {
      let column = Number(el.dataset.column);
      let row = Number(el.dataset.row);
      let guess = app.state.guesses[row][column];
      if (!guess) return null;
      if (guess.status === "exact") {
        el.classList.add("exact");
      } else if (guess.status === "almost") {
        el.classList.add("almost");
      } else if (guess.status === "none") {
        el.classList.add("none");
      } else {
      }
      el.textContent = guess.letter;
    });
  };

  app.updateBoardElsWithLetters = () => {
    app.getBoardLetterEls().forEach((el) => {
      let column = Number(el.dataset.column);
      let row = Number(el.dataset.row);
      let guess = app.state.guesses[row][column];
      if (!guess) return null;

      el.classList.add("guess");
      el.textContent = guess.letter;
    });
  };

  app.updateKeysEls = () => {
    app.getKeyEls().forEach((keyEl) => {
      let status = app.state.keysHash[keyEl.dataset.letter].status;
      if (!status) return null;
      if (status === "exact") {
        keyEl.classList.add("exact");
      } else if (status === "almost") {
        keyEl.classList.add("almost");
      } else if (status === "none") {
        keyEl.classList.add("none");
      } else {
      }
    });
  };
};
