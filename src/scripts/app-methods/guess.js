export default (app) => {
  app.handleGuessLetter = (e) => {
    if (app.state.position >= app.state.word.length) {
      console.warn("to do: next round");
      return null;
    }

    let { letter } = e.target.dataset;
    let result, exactMatch, almostMatch, noMatch, nextGuesses, nextKeysHash;
    exactMatch = app.state.word[app.state.position] === letter;

    if (!exactMatch) {
      almostMatch = app.state.word.split("").includes(letter);
    }
    noMatch = !exactMatch;
    result = exactMatch ? "exact" : almostMatch ? "almost" : "none";
    let guess = {
      letter: letter,
      status: result,
    };
    // update the guesses array
    nextGuesses = app.state.guesses;
    nextGuesses[app.state.round][app.state.position] = guess;
    // update the keys (dif from board, being that the key stays green if was guessed exactly, during prev round)
    nextKeysHash = app.state.keysHash;
    if (result === "exact") nextKeysHash[letter].status === result; //over-rides all other
    if (nextKeysHash[letter].status === "exact") {
      // do nothing, keep it exact because it was previously guessed exact
    } else if (nextKeysHash[letter].status === "almost") {
      // again, do nothing
    } else {
      // exact, almost, none
      nextKeysHash[letter].status = result;
    }

    app.setState({
      position: app.state.position + 1,
      guesses: nextGuesses,
      keysHash: nextKeysHash,
    });

    app.updateBoardElsWithLetters(e);
  };

  app.handleGuessWord = (e) => {
    if (app.state.round >= 5) {
      console.warn("game over");
      alert("game over");
      return null;
    }
    console.log("guess word");
    app.updateBoardEls();
    app.updateKeysEls();

    app.setState({
      round: app.state.round + 1,
      position: 0,
    });
  };
  // app.handleGuessWord = (e) => {
  //   app.updateBoardEls();
  //   app.updateKeysEls();
  // };
};
