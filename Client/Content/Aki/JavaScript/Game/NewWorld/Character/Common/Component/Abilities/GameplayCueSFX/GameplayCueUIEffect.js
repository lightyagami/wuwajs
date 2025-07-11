"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueUIEffect = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueUIEffect extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    this.CYo(true);
  }
  OnDestroy() {
    this.CYo(false);
  }
  CYo(e) {
    var t = this.gYo(this.CueConfig.CueType);
    if (t) {
      EventSystem_1.EventSystem.Emit(t, this.EntityHandle.Id, this.CueConfig, e, this.BuffHandleId);
    }
  }
  gYo(e) {
    switch (e) {
      case 2:
      case 14:
        return EventDefine_1.EEventName.CharOnBuffAddUITexture;
      case 4:
        return EventDefine_1.EEventName.CharOnBuffAddUIPrefab;
      case 5:
        return EventDefine_1.EEventName.CharOnBuffAddUIDamage;
      case 20:
        return EventDefine_1.EEventName.CharOnBuffAddRoleSideEnergyBar;
      case 22:
        return EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips;
      default:
        return;
    }
  }
  static IsSingleInstance() {
    return false;
  }
}
exports.GameplayCueUIEffect = GameplayCueUIEffect;
//# sourceMappingURL=GameplayCueUIEffect.js.map