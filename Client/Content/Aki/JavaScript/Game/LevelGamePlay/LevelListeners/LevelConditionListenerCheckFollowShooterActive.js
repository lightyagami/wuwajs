"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckFollowShooterActive = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckFollowShooterActive extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.gFg = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, ...e));
    };
  }
  OnListen(e, t, n) {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.gFg)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.gFg);
    }
  }
  OnUnListen() {
    if (this.gFg && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.gFg)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.gFg);
    }
  }
}
exports.LevelConditionListenerCheckFollowShooterActive = LevelConditionListenerCheckFollowShooterActive;
//# sourceMappingURL=LevelConditionListenerCheckFollowShooterActive.js.map