"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteLongPress = undefined;
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
const PAUSED_TIME_BUFFER = 50;
class SequenceQteLongPress extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  constructor() {
    super(...arguments);
    this.xXt = 0;
    this.nZc = 0;
    this.Und = false;
  }
  OnReceiveTick(e) {
    super.OnReceiveTick(e);
    var s = this.xXt;
    this.xXt = this.Context.CurrentProgress;
    if (this.xXt > s) {
      this.QteManager.ForwardQte(this.Context.QteId, this.Context.CurrentProgress, this.SequenceQteEndRange);
      this.nZc = 0;
    } else if (this.xXt < s) {
      this.Und = false;
      this.QteManager.BackwardQte(this.Context.QteId, this.Context.CurrentProgress, this.SequenceQteStartRange);
      this.nZc = 0;
    } else if (this.sZc() && (this.nZc += e, this.nZc > PAUSED_TIME_BUFFER)) {
      this.QteManager.PauseQte(this.Context.QteId);
      this.nZc = 0;
    }
  }
  CheckQteFinish() {
    return !!this.Context.IsFail() || !!this.Context.IsSuccess() && !!this.Und;
  }
  OnSequenceQteStop() {
    this.Und = true;
  }
  sZc() {
    return this.Context.DecreaseSpeed <= 0;
  }
}
exports.SequenceQteLongPress = SequenceQteLongPress;
//# sourceMappingURL=SequenceQteLongPress.js.map