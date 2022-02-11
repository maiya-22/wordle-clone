export default (app) => {
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
    app.updateKeysEls();
  };
};
