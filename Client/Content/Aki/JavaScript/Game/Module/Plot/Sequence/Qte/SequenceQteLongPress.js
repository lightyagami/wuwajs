"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteLongPress = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
const PAUSED_TIME_BUFFER = 50;
class SequenceQteLongPress extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  constructor() {
    super(...arguments);
    this.xXt = 0;
    this.ltd = 0;
    this.sad = false;
  }
  OnSequenceAnimFinished() {
    this.sad = true;
    this.CheckFinish();
  }
  OnReceiveTick(e) {
    var s = this.xXt;
    this.xXt = MathUtils_1.MathUtils.Clamp(this.Context.CurrentProgress * SequenceQteHandleBase_1.PERCENT, 0, 1);
    if (this.xXt > s) {
      this.QteManager.ForwardSequenceAnim(this.Context.QteId, this.Context.CurrentProgress, this.SequenceQteEndRange);
      this.ltd = 0;
    } else if (this.xXt < s) {
      this.sad = false;
      this.QteManager.BackwardSequenceAnim(this.Context.QteId, this.Context.CurrentProgress, this.SequenceQteStartRange);
      this.ltd = 0;
    } else if (this._td() && (this.ltd += e, this.ltd > PAUSED_TIME_BUFFER)) {
      this.QteManager.PauseSequenceAnim(this.Context.QteId);
      this.ltd = 0;
    }
    super.OnReceiveTick(e);
  }
  _td() {
    return this.Context.DecreaseSpeed <= 0;
  }
  IsSequenceQteFinished() {
    return !!super.IsSequenceQteFinished() && (!!this.IsForceStop || !!this.sad || !!this.Context.IsFail());
  }
  GetProgress() {
    return this.xXt;
  }
}
exports.SequenceQteLongPress = SequenceQteLongPress;
//# sourceMappingURL=SequenceQteLongPress.js.map