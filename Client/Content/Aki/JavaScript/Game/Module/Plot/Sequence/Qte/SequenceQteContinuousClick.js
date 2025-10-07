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
    this.J6 = 0;
    this.aad = 200;
  }
  OnBegin() {
    super.OnBegin();
    this.MarkSequenceQtePending = true;
  }
  OnReceiveTick(e) {
    this.J6 += e;
    if (!(this.J6 < this.aad)) {
      this.J6 = 0;
      this.Progress = MathUtils_1.MathUtils.Clamp(this.Context.CurrentEnergyPercent * SequenceQteHandleBase_1.PERCENT, 0, 1);
    }
  }
  CanProgressFreeze() {
    return this.Context.DeltaEnergyPercentPerMs < 0;
  }
}
exports.SequenceQteContinuousClick = SequenceQteContinuousClick;
//# sourceMappingURL=SequenceQteContinuousClick.js.map