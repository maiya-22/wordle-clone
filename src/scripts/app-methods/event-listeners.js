export default (app) => {
  app.addEventListeners = () => {
    app.getKeyEls().forEach((el) => {
      if (el.dataset.letter === "enter" || el.dataset.letter === "delete")
        return null;
      el.addEventListener("click", app.handleGuessLetter);
    });
    app.getEnterKey().addEventListener("click", app.handleGuessWord);
  };
};
