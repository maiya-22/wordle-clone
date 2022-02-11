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

  app.updateKeysEls = () => {
    let allGuessesHash = app.state.guesses
      .reduce((arr, rowOfGuesses) => {
        rowOfGuesses.forEach((guess) => {
          if (guess) arr.push(guess);
        });
        return arr;
      }, [])
      .reduce((hash, guess) => {
        hash[guess.letter] = guess.status;
        return hash;
      }, {});
    app.getKeyEls().forEach((keyEl) => {
      let status = allGuessesHash[keyEl.dataset.letter];
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
