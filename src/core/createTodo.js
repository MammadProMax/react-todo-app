export default class {
  constructor(text) {
    this.text = text;
    this.inputChecker();
  }

  create() {
    return { text: this.text, done: false, id: Date.now() };
  }

  inputChecker() {
    let count = 1;
    for (let i = 1; i < this.text.length; i++) {
      if (this.text[0] === " " && this.text[0] === this.text[i]) {
        count++;
      }
    }
    if (count === this.text.length) {
      throw new Error("spacing is not a goal");
    }
    if (this.text.length < 1) {
      throw new Error("there is nothing to add");
    }
  }
}
