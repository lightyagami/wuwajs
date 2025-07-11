"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeTimer = undefined;
const UnionChangeTimerHelper_1 = require("./UnionChangeTimerHelper");
class FbChangeTimer {
  constructor(e) {
    this.FbDataInternal = e;
    this.wEh = false;
    this.PEh = undefined;
    this.UEh = false;
    this.DEh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbChangeTimer(e);
    }
  }
  get TimerType() {
    if (!this.wEh) {
      this.wEh = true;
      this.PEh = this.FbDataInternal.timerType();
    }
    return this.PEh;
  }
  get ChangeType() {
    var e;
    var i;
    if (!this.UEh && (this.UEh = true, e = this.FbDataInternal.changeTypeType(), i = UnionChangeTimerHelper_1.UnionChangeTimerHelper.GetUnionChangeTimerObject(e))) {
      this.DEh = UnionChangeTimerHelper_1.UnionChangeTimerHelper.ReadUnionChangeTimer(e, this.FbDataInternal.changeType(i));
    }
    return this.DEh;
  }
}
exports.FbChangeTimer = FbChangeTimer;
//# sourceMappingURL=FbChangeTimer.js.map