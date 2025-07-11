"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventGuestAnimation = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventGuestAnimation extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, a) {
    var n = e;
    switch (n.UiAnimationConfig.Type) {
      case "Play":
        this.gNc(n.UiAnimationConfig);
        break;
      case "Stop":
        this.CNc(n.UiAnimationConfig);
    }
  }
  gNc(e) {
    if (e.PlayGuestUiAnimation.Type === "GuestCartethyia") {
      ModelManager_1.ModelManager.BattleUiModel.GuestEffect = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowGuestEffect, true);
    }
  }
  CNc(e) {
    if (e.StopGuestUiAnimation.Type === "GuestCartethyia") {
      ModelManager_1.ModelManager.BattleUiModel.GuestEffect = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowGuestEffect, false);
    }
  }
}
exports.LevelEventGuestAnimation = LevelEventGuestAnimation;
//# sourceMappingURL=LevelEventPlayGuestAnimation.js.map