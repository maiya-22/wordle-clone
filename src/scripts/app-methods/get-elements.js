export default (app) => {
  app.getBoardLetterEls = () => {
    return Array.from(document.getElementsByClassName("Board__row__letter"));
  };
  app.getBoardEl = () => {
    return document.getElementsByClassName("Board")[0];
  };
  app.getKeysEl = () => {
    return document.getElementsByClassName("Keys")[0];
  };

  app.getEnterKey = () => {
    return document.querySelector('[data-letter="enter"]');
  };

  app.getKeyEls = () => {
    return Array.from(document.getElementsByClassName("Keys__row__key"));
  };
};
