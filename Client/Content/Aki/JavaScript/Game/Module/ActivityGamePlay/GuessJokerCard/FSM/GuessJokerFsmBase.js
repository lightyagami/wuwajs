"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerFsmBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class GuessJokerFsmBase {
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
  RegisterState(t, s) {
    if (this.StateMap.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerFsmBase 注册状态失败", ["stateType", t]);
      }
    } else {
      this.StateMap.set(t, s);
    }
  }
  ChangeState(t) {
    var s;
    if (this.CheckCanChangeState(this.CurrentStateType, t) && (s = this.Usu(t))) {
      if (this.CurrentState) {
        this.CurrentState.Exit();
      }
      this.CurrentStateType = t;
      this.CurrentState = s;
      this.CurrentState.Enter();
    }
  }
  Usu(t) {
    if (this.StateMap.has(t)) {
      return this.StateMap.get(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerFsmBase 获取状态实例失败", ["stateType", t]);
    }
  }
  GetCurrentStateType() {
    return this.CurrentStateType;
  }
  GetCurrentState() {
    return this.CurrentState;
  }
}
exports.GuessJokerFsmBase = GuessJokerFsmBase;
//# sourceMappingURL=GuessJokerFsmBase.js.map