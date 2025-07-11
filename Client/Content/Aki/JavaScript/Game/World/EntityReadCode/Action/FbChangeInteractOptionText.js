"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeInteractOptionText = undefined;
class FbChangeInteractOptionText {
  constructor(t) {
    this.FbDataInternal = t;
    this.C_h = false;
    this.g_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeInteractOptionText(t);
    }
  }
  get TidContent() {
    if (!this.C_h) {
      this.C_h = true;
      this.g_h = this.FbDataInternal.tidContent();
    }
    return this.g_h;
  }
}
exports.FbChangeInteractOptionText = FbChangeInteractOptionText;
//# sourceMappingURL=FbChangeInteractOptionText.js.map