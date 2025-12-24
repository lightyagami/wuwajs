"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteContinuousClick = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteContinuousClick extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  OnBegin() {
    super.OnBegin();
    this.MarkSequenceQtePending = true;
    this.TickInterval = 200;
  }
  OnReceiveTick(e) {
    this.Progress = MathUtils_1.MathUtils.Clamp(this.Context.CurrentEnergyPercent * SequenceQteHandleBase_1.PERCENT, 0, 1);
  }
}
exports.SequenceQteContinuousClick = SequenceQteContinuousClick;
//# sourceMappingURL=SequenceQteContinuousClick.js.map