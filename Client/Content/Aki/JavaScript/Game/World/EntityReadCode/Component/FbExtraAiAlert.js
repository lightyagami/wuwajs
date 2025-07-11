"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExtraAiAlert = undefined;
class FbExtraAiAlert {
  constructor(t) {
    this.FbDataInternal = t;
    this.W7h = false;
    this.Q7h = 0;
    this.K7h = false;
    this.$7h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbExtraAiAlert(t);
    }
  }
  get MoveAlert() {
    if (!this.W7h) {
      this.W7h = true;
      this.Q7h = this.FbDataInternal.moveAlert();
    }
    return this.Q7h;
  }
  get StopAlert() {
    if (!this.K7h) {
      this.K7h = true;
      this.$7h = this.FbDataInternal.stopAlert();
    }
    return this.$7h;
  }
}
exports.FbExtraAiAlert = FbExtraAiAlert;
//# sourceMappingURL=FbExtraAiAlert.js.map