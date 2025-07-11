"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switcher = undefined;
class Switcher {
  constructor(t, s = undefined) {
    this.vYo = new Set();
    this.Egr = t;
    this.Sgr = s;
  }
  get Active() {
    return this.vYo.size > 0 !== this.Egr;
  }
  SetActive(t, s) {
    var i = this.Active;
    if (this.Egr !== s) {
      this.vYo.add(t);
    } else {
      this.vYo.delete(t);
    }
    if (i !== this.Active && this.Sgr) {
      this.Sgr(this.Active);
    }
  }
}
exports.Switcher = Switcher;
//# sourceMappingURL=Switcher.js.map