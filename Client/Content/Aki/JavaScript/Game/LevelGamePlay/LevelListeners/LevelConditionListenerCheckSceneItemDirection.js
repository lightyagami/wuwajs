"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionListenerCheckSceneItemDirection = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const LevelListenerBase_1 = require("./LevelListenerBase");
class LevelConditionListenerCheckSceneItemDirection extends LevelListenerBase_1.LevelListenerBase {
  constructor() {
    super(...arguments);
    this.Zge = (...e) => {
      this.Callback?.(LevelGeneralContextDefine_1.ClientEventContext.Create(EventDefine_1.EEventName.OnSceneItemRotateStopped, ...e));
    };
  }
  OnListen(e, t, n) {
    e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandleByCheckTargetEntityConfig(e.Target, undefined, n)?.Entity;
    if (e?.Valid && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSceneItemRotateStopped, this.Zge)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.OnSceneItemRotateStopped, this.Zge);
    }
  }
  OnUnListen() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
}
exports.LevelConditionListenerCheckSceneItemDirection = LevelConditionListenerCheckSceneItemDirection;
//# sourceMappingURL=LevelConditionListenerCheckSceneItemDirection.js.map