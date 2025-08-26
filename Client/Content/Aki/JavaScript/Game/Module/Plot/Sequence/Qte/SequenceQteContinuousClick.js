"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteContinuousClick = undefined;
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteContinuousClick extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  constructor() {
    super(...arguments);
    this.xXt = 0;
    this.J6 = 0;
    this.Und = false;
    this.Bnd = 200;
  }
  OnReceiveTick(e) {
    super.OnReceiveTick(e);
    this.J6 += e;
    if (!(this.J6 < this.Bnd)) {
      this.J6 = 0;
      e = this.xXt;
      this.xXt = this.Context.CurrentEnergyPercent;
      if (this.xXt > e) {
        this.QteManager.ForwardQte(this.Context.QteId, this.Context.CurrentEnergyPercent, this.SequenceQteEndRange);
      } else if (this.xXt < e) {
        this.Und = false;
        this.QteManager.BackwardQte(this.Context.QteId, this.Context.CurrentEnergyPercent, this.SequenceQteStartRange);
      } else if (this.sZc()) {
        this.Und = false;
        this.QteManager.PauseQte(this.Context.QteId);
      }
    }
  }
  CheckQteFinish() {
    return !!this.Context.IsFail() || !!this.Context.IsSuccess() && !!this.Und;
  }
  OnSequenceQteStop() {
    this.Und = true;
  }
  sZc() {
    return this.Context.DeltaEnergyPercentPerMs < 0;
  }
}
exports.SequenceQteContinuousClick = SequenceQteContinuousClick;
//# sourceMappingURL=SequenceQteContinuousClick.js.map