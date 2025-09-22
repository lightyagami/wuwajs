"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteContinuousClick = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteContinuousClick extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  constructor() {
    super(...arguments);
    this.xXt = 0;
    this.J6 = 0;
    this.sad = false;
    this.aad = 200;
  }
  OnSequenceAnimFinished() {
    this.sad = true;
    this.CheckFinish();
  }
  OnReceiveTick(e) {
    var s;
    this.J6 += e;
    if (!(this.J6 < this.aad)) {
      this.J6 = 0;
      s = this.xXt;
      this.xXt = MathUtils_1.MathUtils.Clamp(this.Context.CurrentEnergyPercent * SequenceQteHandleBase_1.PERCENT, 0, 1);
      if (this.xXt > s) {
        this.QteManager.ForwardSequenceAnim(this.Context.QteId, this.Context.CurrentEnergyPercent, this.SequenceQteEndRange);
      } else if (this.xXt < s) {
        this.sad = false;
        this.QteManager.BackwardSequenceAnim(this.Context.QteId, this.Context.CurrentEnergyPercent, this.SequenceQteStartRange);
      } else if (this._td()) {
        this.QteManager.PauseSequenceAnim(this.Context.QteId);
      }
    }
    super.OnReceiveTick(e);
  }
  _td() {
    return this.Context.DeltaEnergyPercentPerMs < 0;
  }
  IsSequenceQteFinished() {
    return !!super.IsSequenceQteFinished() && (!!this.IsForceStop || !!this.sad || !!this.Context.IsFail());
  }
  GetProgress() {
    return this.xXt;
  }
}
exports.SequenceQteContinuousClick = SequenceQteContinuousClick;
//# sourceMappingURL=SequenceQteContinuousClick.js.map