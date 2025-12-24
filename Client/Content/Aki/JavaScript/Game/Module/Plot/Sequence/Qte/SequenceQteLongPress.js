"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceQteLongPress = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const SequenceQteHandleBase_1 = require("./SequenceQteHandleBase");
class SequenceQteLongPress extends SequenceQteHandleBase_1.SequenceQteHandleBase {
  OnBegin() {
    super.OnBegin();
    this.MarkSequenceQtePending = true;
  }
  OnReceiveTick(e) {
    this.Progress = MathUtils_1.MathUtils.Clamp(this.Context.CurrentProgress * SequenceQteHandleBase_1.PERCENT, 0, 1);
  }
}
exports.SequenceQteLongPress = SequenceQteLongPress;
//# sourceMappingURL=SequenceQteLongPress.js.map