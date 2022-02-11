import words from "../words/index.js";

export default (app) => {
  app.getRandomWord = () => {
    let wordKeys = Object.keys(app.words);
    let randomIndex = Math.floor(Math.random() * wordKeys.length);
    app.setState({ word: wordKeys[randomIndex] });
  };
};
