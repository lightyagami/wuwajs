"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritBaseState = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class SunSpiritBaseState {
  constructor(t, i) {
    this.StateTypeInternal = t;
    this.SunSpiritData = i;
    this.DIe = 0;
    this.IsFinished = false;
  }
  get StateType() {
    return this.StateTypeInternal;
  }
  Enter() {
    if (this.DIe & 1) {
      return false;
    }
    this.DIe |= 1;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 进入状态", ["StateType", this.StateType], ["StateName", this.constructor.name]);
    }
    var t = this.OnEnter();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SunSpirit", 39, "日灵: 进入状态结束", ["StateType", this.StateType], ["StateName", this.constructor.name], ["Result", t]);
    }
    this.DIe |= 2;
    return t;
  }
  OnEnter() {
    return true;
  }
  Exit() {
    if (!(this.DIe & 4)) {
      this.DIe |= 4;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SunSpirit", 39, "日灵: 退出状态", ["StateType", this.StateType], ["StateName", this.constructor.name]);
      }
      this.OnExit();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SunSpirit", 39, "日灵: 退出状态结束", ["StateType", this.StateType], ["StateName", this.constructor.name]);
      }
      this.DIe |= 8;
    }
  }
  OnExit() {}
  Tick(t) {
    if (this.IsTickable()) {
      this.OnTick(t);
    }
  }
  OnTick(t) {}
  IsSameState(t) {
    return this.StateType === t.StateType && t instanceof this.constructor;
  }
  IsTickable() {
    return !!(this.DIe & 2) && !(this.DIe & 8) && this.OnTick !== SunSpiritBaseState.prototype.OnTick;
  }
}
exports.SunSpiritBaseState = SunSpiritBaseState;
//# sourceMappingURL=SunSpiritBaseState.js.map