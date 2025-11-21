"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteDrag = undefined;
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteDrag extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  OnCommonQteFinished() {
    if (this.Context.IsPreSuccess && this.ProgressLerpSpeed < 0) {
      this.Progress = 1;
      this.ProgressLerpSpeed = this.Context.LerpSpeedInProgress;
    }
    super.OnCommonQteFinished();
  }
  OnReceiveTick(e) {
    if (this.HasCommonQteFinished) {
      this.Progress = 1;
    } else {
      this.Progress = this.Context.GetProgress();
    }
  }
}
exports.SequenceQteDrag = SequenceQteDrag;
//# sourceMappingURL=SequenceQteDrag.js.map