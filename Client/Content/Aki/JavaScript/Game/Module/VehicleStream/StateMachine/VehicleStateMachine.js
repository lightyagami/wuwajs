"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleStateMachine = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class VehicleStateMachine {
  constructor() {
    this.kh = new Map();
    this.xz = undefined;
  }
  Start(t) {
    if (this.xz !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "状态机重复启动", ["state", t]);
      }
      return false;
    } else {
      this.xz = this.GetState(t);
      return !!this.xz && (this.xz.Enter(0), true);
    }
  }
  Destroy() {
    for (const t of this.kh.values()) {
      t.Destroy();
    }
  }
  Update(t) {
    if (this.xz) {
      this.xz.Update(t);
    }
  }
  OnEnterPlayerRange() {
    if (this.xz) {
      this.xz.OnEnterPlayerRange();
    }
  }
  OnLeavePlayerRange() {
    if (this.xz) {
      this.xz.OnLeavePlayerRange();
    }
  }
  Switch(t, ...e) {
    var s;
    var i;
    if (this.xz === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "状态机没有开始", ["state", t]);
      }
      return false;
    } else {
      return !!(s = this.GetState(t)) && (i = this.xz.State, this.xz.Exit(t), this.xz = s, this.xz.Enter(i, ...e), true);
    }
  }
  AddState(t, e) {
    if (this.kh.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "状态重复添加", ["state", t]);
      }
    } else {
      this.kh.set(t, e);
    }
  }
  GetState(t) {
    var e = this.kh.get(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "状态不存在", ["state", t]);
      }
    }
    return e;
  }
  GetCurrentState() {
    return this.xz?.State ?? 0;
  }
}
exports.VehicleStateMachine = VehicleStateMachine;
//# sourceMappingURL=VehicleStateMachine.js.map