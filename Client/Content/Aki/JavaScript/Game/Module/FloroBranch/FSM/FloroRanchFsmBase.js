"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchFsmBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class FloroRanchFsmBase {
  constructor() {
    this.CurrentState = undefined;
    this.CurrentStateType = undefined;
    this.StateMap = new Map();
  }
  Init() {
    this.InitStateInstance();
  }
  Tick(t) {
    if (this.CurrentState) {
      this.CurrentState.Tick(t);
    }
  }
  RegisterState(t, e) {
    if (this.StateMap.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchFsmBase 注册状态失败", ["stateType", t]);
      }
    } else {
      this.StateMap.set(t, e);
    }
  }
  ChangeState(t) {
    var e;
    if (this.CheckCanChangeState(this.CurrentStateType, t) && (e = this.Usu(t))) {
      if (this.CurrentState) {
        this.CurrentState.Exit();
      }
      this.CurrentStateType = t;
      this.CurrentState = e;
      this.CurrentState.Enter();
    }
  }
  Usu(t) {
    if (this.StateMap.has(t)) {
      return this.StateMap.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchStageFsm 获取状态实例失败", ["stateType", t]);
    }
  }
  GetCurrentStateType() {
    return this.CurrentStateType;
  }
  GetCurrentState() {
    return this.CurrentState;
  }
}
exports.FloroRanchFsmBase = FloroRanchFsmBase;
//# sourceMappingURL=FloroRanchFsmBase.js.map