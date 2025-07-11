"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayerInput = undefined;
class FbPlayerInput {
  constructor(t) {
    this.FbDataInternal = t;
    this.K__ = false;
    this.$__ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPlayerInput(t);
    }
  }
  get Input() {
    if (!this.K__) {
      this.K__ = true;
      this.$__ = this.FbDataInternal.input();
    }
    return this.$__;
  }
}
exports.FbPlayerInput = FbPlayerInput;
//# sourceMappingURL=FbPlayerInput.js.map