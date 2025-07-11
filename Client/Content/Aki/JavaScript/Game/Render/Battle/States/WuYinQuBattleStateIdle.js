"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const WuYinQuBattleStateBase_1 = require("./WuYinQuBattleStateBase");
class WuYinQuBattleStateIdle extends WuYinQuBattleStateBase_1.default {
  OnStart() {
    this.OnEnter(0);
  }
  OnEnter(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderBattle", 11, "进入idle状态");
    }
    this.Owner.当前状态 = "静止状态";
  }
  OnUpdate(t) {}
  OnExit(t) {}
}
exports.default = WuYinQuBattleStateIdle;
//# sourceMappingURL=WuYinQuBattleStateIdle.js.map